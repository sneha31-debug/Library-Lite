const express = require('express');
const { register, login, getCurrentUser, logout } = require('./controllers');
const { auth } = require('../middlewares/auth');
const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/social-login', require('./controllers').socialLogin);
router.get('/me', auth, getCurrentUser);
router.post('/logout', auth, logout);

module.exports = router;