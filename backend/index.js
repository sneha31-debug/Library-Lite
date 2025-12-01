require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const { errorHandler } = require('./src/middlewares/errorHandler');
const { auth } = require('./src/middlewares/auth');

const authRoutes = require('./src/auth/routes');
const bookRoutes = require('./src/books/routes');
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/books', express.static(path.join(__dirname, 'public/books')));

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Library-Lite API is running' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;