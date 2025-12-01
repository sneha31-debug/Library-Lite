const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const axios = require('axios');
const AdmZip = require('adm-zip');

const API_URL = process.env.API_URL || 'http://localhost:5001/api';
const UPLOAD_DIR = path.join(__dirname, '../uploads');
const EXTRACT_DIR = path.join(__dirname, '../uploads/extracted');

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m'
};

async function extractZip(zipPath) {
    console.log(`${colors.blue}📦 Extracting ZIP file...${colors.reset}`);

    if (!fs.existsSync(EXTRACT_DIR)) {
        fs.mkdirSync(EXTRACT_DIR, { recursive: true });
    }

    const zip = new AdmZip(zipPath);
    zip.extractAllTo(EXTRACT_DIR, true);

    console.log(`${colors.green}✓ Extraction complete${colors.reset}\n`);
}

function readMetadata() {
    const jsonPath = path.join(EXTRACT_DIR, 'metadata.json');
    const csvPath = path.join(EXTRACT_DIR, 'metadata.csv');

    if (fs.existsSync(jsonPath)) {
        console.log(`${colors.blue}📄 Reading metadata.json...${colors.reset}`);
        return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    } else if (fs.existsSync(csvPath)) {
        console.log(`${colors.blue}📄 Reading metadata.csv...${colors.reset}`);
        return parseCSV(fs.readFileSync(csvPath, 'utf8'));
    } else {
        throw new Error('No metadata.json or metadata.csv found in ZIP file');
    }
}

function parseCSV(csvContent) {
    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());

    return lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        const book = {};
        headers.forEach((header, index) => {
            if (values[index]) {
                book[header] = values[index];
            }
        });
        return book;
    });
}

async function uploadBook(bookData, pdfPath, authToken) {
    const formData = new FormData();

    formData.append('pdf', fs.createReadStream(pdfPath));
    formData.append('title', bookData.title);
    formData.append('authors', bookData.authors);

    if (bookData.description) formData.append('description', bookData.description);
    if (bookData.categories) formData.append('categories', bookData.categories);
    if (bookData.language) formData.append('language', bookData.language);
    if (bookData.publishedDate) formData.append('publishedDate', bookData.publishedDate);
    if (bookData.pageCount) formData.append('pageCount', bookData.pageCount);

    try {
        const response = await axios.post(`${API_URL}/books/library/upload`, formData, {
            headers: {
                ...formData.getHeaders(),
                'Cookie': authToken ? `token=${authToken}` : ''
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        });

        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.error || error.message
        };
    }
}

async function main() {
    console.log(`${colors.blue}
╔═══════════════════════════════════════╗
║   Library-Lite Bulk Upload Script    ║
╚═══════════════════════════════════════╝
${colors.reset}`);

    const zipPath = process.argv[2];
    const authToken = process.argv[3];

    if (!zipPath) {
        console.log(`${colors.red}❌ Error: Please provide ZIP file path${colors.reset}`);
        console.log(`\nUsage: node bulk-upload.js <zip-file-path> [auth-token]`);
        console.log(`Example: node bulk-upload.js ../uploads/books.zip`);
        process.exit(1);
    }

    if (!fs.existsSync(zipPath)) {
        console.log(`${colors.red}❌ Error: ZIP file not found: ${zipPath}${colors.reset}`);
        process.exit(1);
    }

    try {
        // Extract ZIP
        await extractZip(zipPath);

        // Read metadata
        const books = readMetadata();
        console.log(`${colors.green}✓ Found ${books.length} books in metadata${colors.reset}\n`);

        // Upload each book
        const results = {
            success: [],
            failed: []
        };

        for (let i = 0; i < books.length; i++) {
            const book = books[i];
            const pdfPath = path.join(EXTRACT_DIR, book.filename);

            console.log(`${colors.yellow}[${i + 1}/${books.length}] Uploading: ${book.title}${colors.reset}`);

            if (!fs.existsSync(pdfPath)) {
                console.log(`${colors.red}  ✗ PDF not found: ${book.filename}${colors.reset}\n`);
                results.failed.push({ book: book.title, error: 'PDF file not found' });
                continue;
            }

            const result = await uploadBook(book, pdfPath, authToken);

            if (result.success) {
                console.log(`${colors.green}  ✓ Successfully uploaded${colors.reset}\n`);
                results.success.push(book.title);
            } else {
                console.log(`${colors.red}  ✗ Failed: ${result.error}${colors.reset}\n`);
                results.failed.push({ book: book.title, error: result.error });
            }

            // Small delay to avoid overwhelming the server
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        // Print summary
        console.log(`${colors.blue}
╔═══════════════════════════════════════╗
║           Upload Summary              ║
╚═══════════════════════════════════════╝${colors.reset}`);
        console.log(`${colors.green}✓ Successful: ${results.success.length}${colors.reset}`);
        console.log(`${colors.red}✗ Failed: ${results.failed.length}${colors.reset}\n`);

        if (results.failed.length > 0) {
            console.log(`${colors.red}Failed uploads:${colors.reset}`);
            results.failed.forEach(f => {
                console.log(`  - ${f.book}: ${f.error}`);
            });
        }

        // Cleanup
        console.log(`\n${colors.blue}🧹 Cleaning up extracted files...${colors.reset}`);
        fs.rmSync(EXTRACT_DIR, { recursive: true, force: true });
        console.log(`${colors.green}✓ Done!${colors.reset}\n`);

    } catch (error) {
        console.log(`${colors.red}❌ Error: ${error.message}${colors.reset}`);
        process.exit(1);
    }
}

main();
