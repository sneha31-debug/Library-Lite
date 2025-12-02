const path = require('path');

class GitHubPDFService {
  constructor() {
    this.username = "wiz-AR-d";
    this.repo = "book-library-pdfs";
    this.branch = "main";
    this.baseUrl = `https://raw.githubusercontent.com/${this.username}/${this.repo}/${this.branch}/pdfs`;
  }

  // Generate the raw GitHub URL for a PDF
  getPDFUrl(filename) {
    return `${this.baseUrl}/${filename}`;
  }

  // Sanitize filename to be GitHub-friendly
  sanitizeFilename(originalName) {
    const ext = path.extname(originalName);
    const name = path.basename(originalName, ext)
      .replace(/[^a-zA-Z0-9]/g, '-')
      .toLowerCase()
      .substring(0, 50); // Keep filename reasonable length

    const timestamp = Date.now();
    return `${name}-${timestamp}${ext}`;
  }

  // Validate file
  validatePDF(file) {
    const errors = [];

    // Check file type
    if (file.mimetype !== 'application/pdf') {
      errors.push('Only PDF files are allowed');
    }

    // Check file size (90MB to leave buffer under 100MB GitHub limit)
    const maxSize = 90 * 1024 * 1024; // 90MB
    if (file.size > maxSize) {
      errors.push('PDF file must be less than 90MB');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Instructions for manual upload
  getUploadInstructions(filename) {
    return {
      message: 'Please upload the PDF file to GitHub manually',
      steps: [
        `1. Go to: https://github.com/${this.username}/${this.repo}`,
        '2. Navigate to the "pdfs" folder',
        '3. Click "Add file" → "Upload files"',
        `4. Upload your PDF with the name: ${filename}`,
        '5. Commit the changes',
      ],
      repoUrl: `https://github.com/${this.username}/${this.repo}`,
      uploadUrl: `https://github.com/${this.username}/${this.repo}/upload/${this.branch}/pdfs`,
    };
  }

  async fetchPDFStream(filename) {
    const url = this.getPDFUrl(filename);
    try {
      const axios = require('axios');
      const response = await axios({
        method: 'get',
        url: url,
        responseType: 'stream'
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching PDF from GitHub:', error.message);
      throw new Error('Failed to fetch PDF from GitHub');
    }
  }
}

module.exports = new GitHubPDFService();