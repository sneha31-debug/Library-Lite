const express = require('express');
const {
  getLibraryBooks,
  getLibraryBookDetails,
  streamPDF,
  addToCollection,
  rateLibraryBook,
  getUserCollection,
  removeFromCollection,
  getGenres
} = require('./controllers');
const { auth, optionalAuth } = require('../middlewares/auth');

const router = express.Router();

router.get('/genres', getGenres);
router.get('/library', getLibraryBooks);
router.get('/library/:isbn', optionalAuth, getLibraryBookDetails);
router.get('/library/:isbn/pdf', streamPDF);

router.get('/collection', auth, getUserCollection);
router.post('/library/:isbn/add', auth, addToCollection);
router.post('/library/:isbn/rate', auth, rateLibraryBook);
router.delete('/collection/:bookId', auth, removeFromCollection);

module.exports = router;