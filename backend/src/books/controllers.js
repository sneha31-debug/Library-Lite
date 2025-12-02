const { prisma } = require('../../db/config');
const booksService = require('./services');
const path = require('path');
const fs = require('fs');

const getLibraryBooks = async (req, res) => {
  try {
    const { genre, search } = req.query;

    let books;

    if (search) {
      books = await booksService.searchBooks(search);
    } else if (genre) {
      books = await booksService.getBooksByGenre(genre);
    } else {
      books = await booksService.getAllBooks();
    }

    res.json({
      success: true,
      count: books.length,
      books
    });
  } catch (error) {
    console.error('Get library books error:', error);
    res.status(500).json({ error: 'Failed to get library books' });
  }
};

const getLibraryBookDetails = async (req, res) => {
  try {
    const { isbn } = req.params;
    console.log(`[DEBUG] getLibraryBookDetails called for ISBN: ${isbn}`);

    const book = await booksService.getBookByIsbn(isbn);
    console.log(`[DEBUG] Book found in service:`, book ? 'Yes' : 'No');

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    let userRating = null;
    let totalRatings = 0;
    let averageRating = 0;

    try {
      if (req.userId) {
        const rating = await prisma.rating.findFirst({
          where: {
            userId: req.userId,
            book: {
              isbn: isbn
            }
          }
        });
        userRating = rating ? rating.rating : null;
      }

      const dbBook = await prisma.book.findFirst({
        where: { isbn: isbn },
        include: {
          ratings: {
            select: { rating: true }
          }
        }
      });

      if (dbBook) {
        totalRatings = dbBook.ratings.length;
        if (totalRatings > 0) {
          averageRating = dbBook.ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings;
        }
      }
    } catch (dbError) {
      console.error('Database error in getLibraryBookDetails:', dbError.message);
      // Continue without DB data
    }

    // Handle pdfUrl: extract filename if it's a path
    let pdfFilename = book.pdfUrl;
    if (pdfFilename && pdfFilename.includes('/')) {
      pdfFilename = path.basename(pdfFilename);
    }

    res.json({
      success: true,
      book: {
        ...book,
        pdfUrl: pdfFilename, // Ensure frontend gets the filename or cleaned URL
        userRating,
        averageRating: averageRating.toFixed(1),
        totalRatings
      }
    });
  } catch (error) {
    console.error('Get library book details error:', error);
    res.status(500).json({ error: 'Failed to get book details' });
  }
};

const streamPDF = async (req, res) => {
  try {
    const { isbn } = req.params;

    const book = await booksService.getBookByIsbn(isbn);

    // Also check Prisma DB if not found in service or if service doesn't have pdfUrl
    let pdfFilename = book ? book.pdfUrl : null;

    try {
      const dbBook = await prisma.book.findFirst({ where: { isbn } });
      if (dbBook && dbBook.pdfUrl) pdfFilename = dbBook.pdfUrl;
    } catch (dbError) {
      console.log('DB lookup failed in streamPDF, using JSON data');
    }

    if (!pdfFilename) {
      return res.status(404).json({ error: 'PDF not available for this book' });
    }

    // Clean up filename if it's a path
    if (pdfFilename.includes('/')) {
      pdfFilename = path.basename(pdfFilename);
    }

    const githubService = require('./githubService');

    try {
      const stream = await githubService.fetchPDFStream(pdfFilename);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="${pdfFilename}"`);
      stream.pipe(res);
    } catch (err) {
      console.error('GitHub Stream Error:', err.message);
      return res.status(404).json({ error: 'PDF file not found in repository' });
    }

  } catch (error) {
    console.error('Stream PDF error:', error);
    res.status(500).json({ error: 'Failed to stream PDF' });
  }
};

const addToCollection = async (req, res) => {
  try {
    const { isbn } = req.params;

    const libraryBook = await booksService.getBookByIsbn(isbn);

    if (!libraryBook) {
      return res.status(404).json({ error: 'Book not found in library' });
    }

    let book = await prisma.book.findFirst({
      where: { isbn: isbn }
    });

    if (!book) {
      book = await prisma.book.create({
        data: {
          title: libraryBook.title,
          author: libraryBook.author,
          description: libraryBook.description,
          coverImage: libraryBook.coverImage,
          isbn: libraryBook.isbn,
          genre: libraryBook.genre,
          userId: req.userId,
          pdfUrl: libraryBook.pdfUrl
        }
      });
    }

    res.json({
      success: true,
      message: 'Book added to your collection',
      book
    });
  } catch (error) {
    console.error('Add to collection error:', error);
    res.status(500).json({ error: 'Failed to add book to collection' });
  }
};

const rateLibraryBook = async (req, res) => {
  try {
    const { isbn } = req.params;
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const libraryBook = await booksService.getBookByIsbn(isbn);

    if (!libraryBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    let book = await prisma.book.findFirst({
      where: { isbn: isbn }
    });

    if (!book) {
      book = await prisma.book.create({
        data: {
          title: libraryBook.title,
          author: libraryBook.author,
          description: libraryBook.description,
          coverImage: libraryBook.coverImage,
          isbn: libraryBook.isbn,
          genre: libraryBook.genre,
          userId: req.userId,
          pdfUrl: libraryBook.pdfUrl
        }
      });
    }

    const bookRating = await prisma.rating.upsert({
      where: {
        userId_bookId: {
          userId: req.userId,
          bookId: book.id
        }
      },
      create: {
        rating,
        userId: req.userId,
        bookId: book.id
      },
      update: {
        rating
      }
    });

    res.json({
      success: true,
      message: 'Book rated successfully',
      rating: bookRating
    });
  } catch (error) {
    console.error('Rate library book error:', error);
    res.status(500).json({ error: 'Failed to rate book' });
  }
};

const getUserCollection = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      where: { userId: req.userId },
      include: {
        ratings: {
          where: { userId: req.userId },
          select: { rating: true }
        },
        _count: {
          select: { ratings: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      count: books.length,
      books
    });
  } catch (error) {
    console.error('Get user collection error:', error);
    res.status(500).json({ error: 'Failed to get collection' });
  }
};

const removeFromCollection = async (req, res) => {
  try {
    const { bookId } = req.params;

    const book = await prisma.book.findUnique({
      where: { id: bookId }
    });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (book.userId !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to remove this book' });
    }

    await prisma.book.delete({
      where: { id: bookId }
    });

    res.json({
      success: true,
      message: 'Book removed from collection'
    });
  } catch (error) {
    console.error('Remove from collection error:', error);
    res.status(500).json({ error: 'Failed to remove book' });
  }
};

module.exports = {
  getLibraryBooks,
  getLibraryBookDetails,
  streamPDF,
  addToCollection,
  rateLibraryBook,
  getUserCollection,
  removeFromCollection
};