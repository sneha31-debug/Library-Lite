# 📚 Library Lite

**Library Lite** is a full-stack web application designed to manage and explore a digital library system.  
It allows users to browse books, write reviews, create posts, and interact with the community — all in one place.

---

## 🚀 Overview

Library Lite provides a seamless experience for both students and administrators.  
It includes authentication, book management, review posting, and a clean, responsive UI.

Built using:
- **React + Vite + Tailwind CSS** (Frontend)
- **Node.js + Express.js + Prisma** (Backend)
- **MySQL 8.0 in Docker** (Database)

**Unified Monorepo Structure** - Frontend and backend integrated for simplified development and deployment.

---

## 📁 Project Structure

```
library-lite/
├── client/              # React frontend source
│   ├── src/
│   ├── public/
│   └── index.html
├── src/                 # Express backend source
│   ├── auth/
│   ├── books/
│   ├── users/
│   ├── posts/
│   └── comments/
├── prisma/              # Database schema and migrations
│   ├── schema.prisma
│   └── seed.js
├── dist/                # Built frontend (generated)
├── server.js            # Main server entry point
├── package.json         # Unified dependencies
├── docker-compose.yml   # MySQL container config
└── .env                 # Environment variables
```

---

## ✨ Features

- 🔐 **User Authentication** – Secure login and signup using JWT.  
- 📚 **Book Management** – Browse and view details about available books.  
- ✍️ **Post & Review System** – Share posts and write reviews on books.  
- 🖥️ **Responsive UI** – Modern and mobile-friendly interface with Tailwind CSS.  
- ⚙️ **Prisma ORM** – Efficient and type-safe database access.
- 🐳 **Docker Support** – Containerized MySQL database for easy setup.
- 📦 **Monorepo** – Unified structure for simplified development.

---

## 🧠 Getting Started

### 📦 Prerequisites

- **Node.js** (v16 or higher) and **npm** installed  
- **Docker** and **Docker Compose** installed ([Get Docker](https://docs.docker.com/get-docker/))

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/sneha31-debug/Library-Lite.git
cd Library-Lite
```

### 2️⃣ Start MySQL Database with Docker

```bash
# Start MySQL container in detached mode
docker compose up -d

# Verify MySQL is running
docker compose ps
```

### 3️⃣ Install Dependencies

```bash
# Install all dependencies (frontend + backend)
npm install
```

### 4️⃣ Setup Environment Variables

```bash
# Copy environment template
cp .env.example .env

# Edit .env and configure your settings
```

### 5️⃣ Setup Database

```bash
# Generate Prisma client
npm run prisma:generate

# Push database schema to MySQL
npm run db:push

# Seed the database with initial data
npm run prisma:seed
```

### 6️⃣ Run Development Server

```bash
# Start both frontend and backend concurrently
npm run dev
```

The application will be available at:
- **Frontend:** `http://localhost:5173` (Vite dev server)
- **Backend API:** `http://localhost:5001/api`

### 7️⃣ Build for Production

```bash
# Build frontend
npm run build

# Start production server (serves built frontend + API)
NODE_ENV=production npm start
```

In production, everything runs on `http://localhost:5001`

---

## 🛠️ Available Scripts

### Development

```bash
npm run dev              # Run both frontend and backend
npm run dev:server       # Run backend only
npm run dev:client       # Run frontend only
```

### Build & Production

```bash
npm run build            # Build frontend for production
npm start                # Start production server
npm run preview          # Preview production build
```

### Docker Commands

```bash
npm run docker:up        # Start MySQL container
npm run docker:down      # Stop MySQL container
npm run docker:reset     # Reset database (removes all data)
npm run docker:logs      # View MySQL logs
```

### Database Management

```bash
npm run db:push          # Push schema changes to database
npm run db:reset         # Reset and reseed database
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio (GUI)
npm run prisma:seed      # Seed database with initial data
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL="mysql://library_user:library_password@localhost:3306/library_lite"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRE="7d"

# Server Configuration
PORT=5001
NODE_ENV="development"

# CORS Configuration (Frontend URL)
FRONTEND_URL="http://localhost:5173"
```

> **Note:** The default MySQL credentials are defined in `docker-compose.yml`. Change them for production use.

---

## 🗄️ Database Schema

The application uses Prisma ORM with the following models:
- **User** – User accounts and profiles
- **Book** – Book information from Google Books API
- **UserBook** – User's reading status for books
- **Rating** – Book ratings and reviews
- **Comment** – Comments on books
- **Post** – User posts
- **PostLike** – Likes on posts
- **Follow** – User follow relationships

---

## 🚀 Deployment

### Production Build

```bash
# 1. Build frontend
npm run build

# 2. Set environment to production
export NODE_ENV=production

# 3. Start server
npm start
```

The server will:
- Serve the built React app from `dist/`
- Handle API requests at `/api/*`
- Serve static assets with proper caching
- Handle client-side routing (SPA)

### Deployment Platforms

**Render / Railway / Heroku:**
```yaml
Build Command: npm install && npm run build
Start Command: npm start
```

**Environment Variables:**
- Set `DATABASE_URL` to your production MySQL URL
- Set `NODE_ENV=production`
- Set `JWT_SECRET` to a secure random string

---

## 🛠️ Troubleshooting

### MySQL Connection Issues

If you encounter connection errors:

1. **Check if MySQL container is running:**
   ```bash
   docker-compose ps
   ```

2. **Check MySQL logs:**
   ```bash
   npm run docker:logs
   ```

3. **Restart MySQL container:**
   ```bash
   docker-compose restart mysql
   ```

4. **Reset everything:**
   ```bash
   npm run docker:reset
   npm run db:push
   ```

### Port Already in Use

**If port 3306 is already in use:**

1. Stop existing MySQL service:
   ```bash
   # macOS
   brew services stop mysql
   
   # Linux
   sudo systemctl stop mysql
   ```

2. Or change the port in `docker-compose.yml`:
   ```yaml
   ports:
     - "3307:3306"  # Use port 3307 instead
   ```
   Then update `DATABASE_URL` in `.env` to use port 3307.

**If port 5001 is already in use:**

Change `PORT` in `.env` to a different port (e.g., `5002`).

### Build Issues

```bash
# Clear node_modules and reinstall
rm -rf node_modules client/node_modules
npm install

# Clear build cache
rm -rf dist
npm run build
```

---

## 📝 API Endpoints

All API endpoints are prefixed with `/api`:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Add new book

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `POST /api/posts/:id/like` - Like/unlike post

### Comments
- `GET /api/comments/:bookId` - Get comments for a book
- `POST /api/comments` - Add new comment

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👥 Authors

Created with ❤️ by the Library Lite team

---

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vite Guide](https://vite.dev/)
- [Docker Documentation](https://docs.docker.com/)
