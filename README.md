<div align="center">

# 📚 Library Lite

### A Modern Full-Stack Digital Library Management System

[![Contributors](https://img.shields.io/badge/contributors-4-blue.svg)](https://github.com/sneha31-debug/Library-Lite/graphs/contributors)
[![JavaScript](https://img.shields.io/badge/language-JavaScript-yellow.svg)](https://github.com/sneha31-debug/Library-Lite)
[![License](https://img.shields.io/badge/license-Open%20Source-green.svg)](https://github.com/sneha31-debug/Library-Lite)

**Library Lite** is a comprehensive full-stack web application that revolutionizes digital library management. The platform enables users to browse extensive book collections, read PDFs seamlessly, write detailed reviews, create engaging posts, interact with a vibrant community, and efficiently manage personal reading collections.

[View Demo](#) · [Report Bug](https://github.com/sneha31-debug/Library-Lite/issues) · [Request Feature](https://github.com/sneha31-debug/Library-Lite/issues)

</div>

---

## 🚀 Overview

Library Lite delivers a seamless, feature-rich experience designed for students, readers, and library administrators. The application combines robust authentication mechanisms, comprehensive book management with integrated PDF viewing capabilities, dynamic social features including posts with likes and comments, detailed review systems, shopping cart functionality, favorites management, and an elegant, responsive user interface.

### Technology Stack

```
Frontend:  React 18 + Vite + Tailwind CSS
Backend:   Node.js + Express.js + Prisma ORM
Database:  MySQL
Auth:      JWT + Google OAuth 2.0
```

---

## ✨ Key Features

### 🔐 Authentication & User Management
- **JWT-Based Authentication** – Enterprise-grade secure login and signup system
- **Google OAuth 2.0 Integration** – Streamlined single sign-on capability
- **User Profile Management** – Comprehensive profile viewing for self and community members
- **Session Management** – Secure logout and session handling

### 📚 Advanced Book Management
- **Intelligent Book Browser** – Explore extensive library collections with intuitive search
- **Detailed Book Information** – Comprehensive metadata and descriptions
- **Genre-Based Categorization** – Efficient filtering and discovery by genre
- **Integrated PDF Reader** – In-browser reading experience with full PDF support
- **Shopping Cart System** – Convenient book selection and management
- **Favorites Collection** – Personalized bookmarking for quick access

### 💬 Social & Community Engagement
- **Dynamic Post Feed** – Share insights and updates with the community
- **Content Creation** – Publish and manage personal posts
- **Social Interactions** – Like and appreciate community contributions
- **Discussion Threads** – Engage in meaningful conversations through comments
- **Content Moderation** – Delete and manage your own posts
- **Review Platform** – Write, read, and share book reviews

### 🎨 User Experience
- **Responsive Design** – Fully optimized for desktop, tablet, and mobile devices
- **Intuitive Navigation** – Streamlined user flows and clear information architecture
- **Modern UI/UX** – Clean, professional interface built with Tailwind CSS
- **Performance Optimized** – Fast loading times and smooth interactions

### ⚙️ Technical Excellence
- **Prisma ORM** – Type-safe database operations with efficient queries
- **RESTful API Architecture** – Well-structured, scalable backend endpoints
- **Component-Based Frontend** – Reusable React components for maintainability
- **Security Best Practices** – Password hashing, JWT tokens, and secure authentication

---

## 🛠️ Installation & Setup

### Prerequisites

Ensure your development environment meets the following requirements:

- **Node.js** v14.0 or higher
- **npm** or **yarn** package manager
- **MySQL** server (local or remote instance)
- **Google OAuth Credentials** (for authentication features)

### Step 1: Clone the Repository

```bash
git clone https://github.com/sneha31-debug/Library-Lite.git
cd Library-Lite
```

### Step 2: Backend Configuration

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following configuration:

```env
DATABASE_URL="mysql://username:password@localhost:3306/library_lite"
JWT_SECRET="your-secure-jwt-secret-key"
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"
PORT=5000
```

Initialize the database with Prisma:

```bash
npx prisma migrate dev
npx prisma generate
```

(Optional) Seed the database with sample data:

```bash
npm run seed
```

Start the backend development server:

```bash
npm run dev
```

The backend API will be available at `http://localhost:5000`

### Step 3: Frontend Configuration

Open a new terminal window and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID="your-google-oauth-client-id"
```

Launch the frontend development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173` (or the port displayed in your terminal).

---

## 📁 Project Architecture

```
Library-Lite/
├── backend/
│   ├── src/
│   │   ├── auth/          # Authentication routes, controllers, and middleware
│   │   ├── books/         # Book management and CRUD operations
│   │   ├── comments/      # Comment functionality and API endpoints
│   │   ├── posts/         # Post management with like functionality
│   │   ├── reviews/       # Review system and rating management
│   │   └── users/         # User profile and account management
│   ├── prisma/
│   │   ├── schema.prisma  # Database schema definitions
│   │   └── migrations/    # Database migration files
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/    # Reusable React components
    │   │   ├── CommentSection.jsx
    │   │   ├── PostCard.jsx
    │   │   ├── ReviewSection.jsx
    │   │   └── ...
    │   ├── pages/         # Application page components
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Books.jsx
    │   │   ├── BookDetail.jsx
    │   │   ├── Genres.jsx
    │   │   ├── Feed.jsx
    │   │   ├── AddPost.jsx
    │   │   ├── AddReview.jsx
    │   │   ├── Profile.jsx
    │   │   └── OtherUserProfile.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

---

## 🎯 User Guide

### Getting Started

1. **Account Creation** – Register a new account or authenticate using Google OAuth
2. **Explore Library** – Browse the comprehensive book collection by genre or search
3. **Read Content** – Access book details and utilize the integrated PDF reader
4. **Manage Collections** – Add books to your cart or mark them as favorites
5. **Write Reviews** – Share detailed reviews and ratings for books you've read
6. **Community Engagement** – Create posts, participate in discussions, and interact with other users
7. **Profile Management** – Customize and maintain your user profile

---

## 🔧 Technology Stack

### Frontend Technologies
- **React 18** – Modern JavaScript library for building user interfaces
- **Vite** – Next-generation frontend build tool
- **Tailwind CSS** – Utility-first CSS framework
- **React Router** – Declarative routing for React applications
- **Axios** – Promise-based HTTP client

### Backend Technologies
- **Node.js** – JavaScript runtime environment
- **Express.js** – Fast, minimalist web framework
- **Prisma ORM** – Next-generation Node.js and TypeScript ORM
- **MySQL** – Reliable relational database management system
- **JWT** – Secure token-based authentication
- **Google OAuth 2.0** – Industry-standard authorization protocol
- **bcrypt** – Password hashing library

---

## 👥 Contributors

This project is actively maintained by **[sneha31-debug](https://github.com/sneha31-debug)** with valuable contributions from:

- **[wiz-AR-d](https://github.com/wiz-AR-d)** – PDF integration and feature development
- **[ramanverse](https://github.com/ramanverse)** – Social features and backend enhancements

We welcome contributions from the community! See our [Contributing Guidelines](#-contributing) below.

---

## 📝 Changelog

### December 2025
- ✅ **Google OAuth Integration** – Implemented seamless Google authentication
- ✅ **Social Interactions** – Added like and comment functionality for posts
- ✅ **Content Management** – Introduced delete post capability
- ✅ **PDF Viewer** – Integrated in-browser PDF reading experience
- ✅ **Bug Fixes** – Resolved logout functionality issues
- ✅ **Feature Enhancement** – Improved cart and favorites systems

### November 2025
- ✅ **UI/UX Improvements** – Enhanced cart display and overall interface
- ✅ **Favorites System** – Implemented comprehensive favorites management
- ✅ **Navigation Fixes** – Resolved cart page routing issues
- ✅ **Stability Updates** – Various bug fixes and performance enhancements

---

## 🚀 Roadmap

### Planned Features
- 🔍 **Advanced Search** – Implement sophisticated filtering and search algorithms
- 🤖 **AI Recommendations** – Personalized book suggestions based on reading history
- 📊 **Analytics Dashboard** – User reading statistics and insights
- 👨‍💼 **Admin Panel** – Comprehensive library management interface
- 📧 **Notifications** – Email alerts for new content and updates
- 🌙 **Dark Mode** – Theme toggle for enhanced user experience
- 📱 **Mobile Application** – Native iOS and Android apps

---

## 📄 License

This project is open source and available for educational and non-commercial purposes.

---

## 🤝 Contributing

We enthusiastically welcome contributions from the community! Whether you're fixing bugs, improving documentation, or proposing new features, your input is valued.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

For major changes, please open an issue first to discuss proposed modifications.

---

## 📧 Support & Contact

- **Issues & Bugs**: [GitHub Issues](https://github.com/sneha31-debug/Library-Lite/issues)
- **Feature Requests**: [GitHub Issues](https://github.com/sneha31-debug/Library-Lite/issues)
- **Discussions**: [GitHub Discussions](https://github.com/sneha31-debug/Library-Lite/discussions)

---

<div align="center">

**Built with ❤️ by the Library Lite Team**

⭐ Star this repository if you find it helpful!

</div>
