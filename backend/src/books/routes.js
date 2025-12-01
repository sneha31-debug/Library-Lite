const express = require('express');
const {
  getLibraryBooks,
  getLibraryBookDetails,
  streamPDF,
  streamPreview,
  uploadBook,
  addToCollection,
  rateLibraryBook,
  getUserCollection,
  removeFromCollection
} = require('./controllers');
const { auth, optionalAuth } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

const router = express.Router();

router.get('/library', getLibraryBooks);
router.get('/library/:isbn', optionalAuth, getLibraryBookDetails);
router.get('/library/:isbn/pdf', streamPDF);
router.get('/library/:isbn/preview', streamPreview);
router.post('/library/upload', upload.single('pdf'), uploadBook);

router.get('/collection', auth, getUserCollection);
router.post('/library/:isbn/add', auth, addToCollection);
router.post('/library/:isbn/rate', auth, rateLibraryBook);
router.delete('/collection/:bookId', auth, removeFromCollection);

module.exports = router;