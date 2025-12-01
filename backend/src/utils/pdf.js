const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');

/**
 * Generate a preview PDF containing only the first 5 pages
 * @param {string} pdfPath - Path to the original PDF file
 * @param {string} outputPath - Path where the preview PDF will be saved
 * @returns {Promise<void>}
 */
async function generatePreview(pdfPath, outputPath) {
    try {
        // Read the original PDF
        const pdfBytes = await fs.readFile(pdfPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);

        // Get total number of pages
        const totalPages = pdfDoc.getPageCount();
        const pagesToExtract = Math.min(5, totalPages);

        // Create a new PDF document for the preview
        const previewDoc = await PDFDocument.create();

        // Copy the first 5 pages (or fewer if the PDF has less than 5 pages)
        const pageIndices = Array.from({ length: pagesToExtract }, (_, i) => i);
        const copiedPages = await previewDoc.copyPages(pdfDoc, pageIndices);

        // Add the copied pages to the preview document
        copiedPages.forEach(page => {
            previewDoc.addPage(page);
        });

        // Save the preview PDF
        const previewBytes = await previewDoc.save();
        await fs.writeFile(outputPath, previewBytes);

        console.log(`Preview generated: ${outputPath} (${pagesToExtract} pages)`);
    } catch (error) {
        console.error('Error generating preview:', error);
        throw new Error('Failed to generate PDF preview');
    }
}

module.exports = {
    generatePreview
};
