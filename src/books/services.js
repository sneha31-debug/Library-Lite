const fs = require('fs').promises;
const path = require('path');

class BooksService {
  constructor() {
    this.booksDataPath = path.join(__dirname, '../data/books.json');
  }
  async loadBooksData() {
    try {
      const data = await fs.readFile(this.booksDataPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading books data:', error);
      return [];
    }
  }
  async getAllBooks() {
    return await this.loadBooksData();
  }
  async getBookByIsbn(isbn) {
    const books = await this.loadBooksData();
    console.log(`[DEBUG] Loaded ${books.length} books from ${this.booksDataPath}`);
    const book = books.find(book => book.isbn === isbn);
    console.log(`[DEBUG] Searching for ISBN ${isbn}, found:`, book ? 'Yes' : 'No');
    return book;
  }

  async searchBooks(query) {
    const books = await this.loadBooksData();
    const searchTerm = query.toLowerCase();

    return books.filter(book =>
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.genre.toLowerCase().includes(searchTerm) ||
      book.description.toLowerCase().includes(searchTerm)
    );
  }
  async getBooksByGenre(genre) {
    const books = await this.loadBooksData();
    return books.filter(book =>
      book.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  async getUniqueGenres() {
    const books = await this.loadBooksData();
    const genres = [...new Set(books.map(book => book.genre))];
    return genres.sort();
  }
}

module.exports = new BooksService();