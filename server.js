require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const { errorHandler } = require('./src/middlewares/errorHandler');
const { auth } = require('./src/middlewares/auth');

const authRoutes = require('./src/auth/routes');
const booksRoutes = require('./src/books/routes');
const usersRoutes = require('./src/users/routes');
const postsRoutes = require('./src/posts/routes');
const commentsRoutes = require('./src/comments/routes');

const app = express();

app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:5174'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/books', express.static(path.join(__dirname, 'public/books')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Library-Lite API is running' });
});

// Serve static files from the React app (production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;