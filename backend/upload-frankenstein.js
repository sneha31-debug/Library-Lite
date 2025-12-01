const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:5001/api';

// Direct paths to our files
const PDF_PATH = '/Users/ramanthakur/.gemini/antigravity/scratch/library-lite-login/uploads/extracted/Frankestein/frankenstein.pdf';
const METADATA_PATH = '/Users/ramanthakur/.gemini/antigravity/scratch/library-lite-login/uploads/extracted/Frankestein/metadata.json';

async function uploadBook() {
    console.log('🚀 Uploading Frankenstein to Library-Lite...\n');

    // Read metadata
    const metadata = JSON.parse(fs.readFileSync(METADATA_PATH, 'utf8'))[0];

    // Create form data
    const formData = new FormData();
    formData.append('pdf', fs.createReadStream(PDF_PATH));
    formData.append('title', metadata.title);
    formData.append('authors', metadata.authors);
    formData.append('description', metadata.description);
    formData.append('categories', metadata.categories);
    formData.append('language', metadata.language);
    formData.append('publishedDate', metadata.publishedDate);
    formData.append('pageCount', metadata.pageCount);

    try {
        console.log(`📚 Uploading: ${metadata.title}`);
        console.log(`👤 Author: ${metadata.authors}`);
        console.log(`📄 File: frankenstein.pdf\n`);

        const response = await axios.post(`${API_URL}/books/library/upload`, formData, {
            headers: formData.getHeaders(),
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        });

        console.log('✅ Upload successful!');
        console.log(`📖 Preview will be generated automatically (first 5 pages)`);
        console.log(`⬇️  Users can download the full PDF\n`);
        console.log('🎉 Frankenstein is now available on your library!');

    } catch (error) {
        console.log('❌ Upload failed:', error.response?.data?.error || error.message);

        if (error.response?.status === 401) {
            console.log('\n⚠️  Authentication required. You may need to login first.');
        }
    }
}

uploadBook();
