const { prisma } = require('../../db/config');
const booksService = require('./services');
const path = require('path');
const fs = require('fs');

const getLibraryBooks = async (req, res) => {
  try {
    const { genre, search } = req.query;

    let books;

    // Fetch from database instead of books.json
    if (search) {
      books = await prisma.book.findMany({
        where: {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { authors: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            { categories: { contains: search, mode: 'insensitive' } }
          ]
        }
      });
    } else if (genre) {
      books = await prisma.book.findMany({
        where: {
          categories: { contains: genre, mode: 'insensitive' }
        }
      });
    } else {
      books = await prisma.book.findMany({
        orderBy: { createdAt: 'desc' }
      });
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

    const book = await booksService.getBookByIsbn(isbn);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    let userRating = null;
    let totalRatings = 0;
    let averageRating = 0;

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

    res.json({
      success: true,
      book: {
        ...book,
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

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const pdfFilename = path.basename(book.pdfUrl);
    const pdfPath = path.join(__dirname, '../../public/books/pdfs', pdfFilename);

    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({ error: 'PDF file not found' });
    }

    const stat = fs.statSync(pdfPath);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Disposition', `attachment; filename="${book.title}.pdf"`);

    const stream = fs.createReadStream(pdfPath);
    stream.pipe(res);
  } catch (error) {
    console.error('Stream PDF error:', error);
    res.status(500).json({ error: 'Failed to stream PDF' });
  }
};

const streamPreview = async (req, res) => {
  try {
    const { isbn } = req.params;

    const book = await booksService.getBookByIsbn(isbn);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (!book.previewUrl) {
      return res.status(404).json({ error: 'Preview not available for this book' });
    }

    const previewFilename = path.basename(book.previewUrl);
    const previewPath = path.join(__dirname, '../../public/books/previews', previewFilename);

    if (!fs.existsSync(previewPath)) {
      return res.status(404).json({ error: 'Preview file not found' });
    }

    const stat = fs.statSync(previewPath);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Disposition', `inline; filename="${book.title}-preview.pdf"`);

    const stream = fs.createReadStream(previewPath);
    stream.pipe(res);
  } catch (error) {
    console.error('Stream preview error:', error);
    res.status(500).json({ error: 'Failed to stream preview' });
  }
};

const uploadBook = async (req, res) => {
  try {
    const { title, authors, description, categories, language, publishedDate, pageCount } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    if (!title || !authors) {
      return res.status(400).json({ error: 'Title and authors are required' });
    }

    const pdfFilename = req.file.filename;
    const pdfPath = path.join(__dirname, '../../public/books/pdfs', pdfFilename);
    const previewFilename = `preview-${pdfFilename}`;
    const previewPath = path.join(__dirname, '../../public/books/previews', previewFilename);

    // Generate preview
    const { generatePreview } = require('../utils/pdf');
    await generatePreview(pdfPath, previewPath);

    // Create book in database
    const book = await prisma.book.create({
      data: {
        title,
        authors,
        description: description || null,
        categories: categories || 'Uncategorized',
        language: language || null,
        publishedDate: publishedDate || null,
        pageCount: pageCount ? parseInt(pageCount) : null,
        pdfUrl: `/books/pdfs/${pdfFilename}`,
        previewUrl: `/books/previews/${previewFilename}`
      }
    });

    res.status(201).json({
      success: true,
      message: 'Book uploaded successfully',
      book
    });
  } catch (error) {
    console.error('Upload book error:', error);
    res.status(500).json({ error: 'Failed to upload book' });
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
      where: { googleId: isbn }
    });

    if (!book) {
      book = await prisma.book.create({
        data: {
          title: libraryBook.title,
          authors: libraryBook.author,
          description: libraryBook.description,
          thumbnail: libraryBook.coverImage,
          googleId: libraryBook.isbn,
          categories: libraryBook.genre
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
      where: { googleId: isbn }
    });

    if (!book) {
      book = await prisma.book.create({
        data: {
          title: libraryBook.title,
          authors: libraryBook.author,
          description: libraryBook.description,
          thumbnail: libraryBook.coverImage,
          googleId: libraryBook.isbn,
          categories: libraryBook.genre
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
      where: {
        userBooks: {
          some: {
            userId: req.userId
          }
        }
      },
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

    const userBook = await prisma.userBook.findFirst({
      where: {
        bookId: parseInt(bookId),
        userId: req.userId
      }
    });

    if (!userBook) {
      return res.status(404).json({ error: 'Book not found in your collection' });
    }

    await prisma.userBook.delete({
      where: { id: userBook.id }
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
  streamPreview,
  uploadBook,
  addToCollection,
  rateLibraryBook,
  getUserCollection,
  removeFromCollection
};