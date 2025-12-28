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

---

## ✨ Features

- 🔐 **User Authentication** – Secure login and signup using JWT.  
- 📚 **Book Management** – Browse and view details about available books.  
- ✍️ **Post & Review System** – Share posts and write reviews on books.  
- 🖥️ **Responsive UI** – Modern and mobile-friendly interface with Tailwind CSS.  
- ⚙️ **Prisma ORM** – Efficient and type-safe database access.
- 🐳 **Docker Support** – Containerized MySQL database for easy setup.

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
cd library-lite
```

### 2️⃣ Start MySQL Database with Docker

```bash
# Start MySQL container in detached mode
docker-compose up -d

# Verify MySQL is running
docker-compose ps

# View MySQL logs (optional)
docker-compose logs -f mysql
```

### 3️⃣ Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Copy environment template and configure
cp .env.example .env

# Generate Prisma client
npm run prisma:generate

# Push database schema to MySQL
npx prisma db push

# Seed the database with initial data
npm run prisma:seed

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 4️⃣ Setup Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

---

## 🐳 Docker Commands

### MySQL Container Management

```bash
# Start MySQL container
npm run docker:up          # or: docker-compose up -d

# Stop MySQL container
npm run docker:down        # or: docker-compose down

# Reset database (removes all data)
npm run docker:reset       # or: docker-compose down -v && docker-compose up -d

# View MySQL logs
npm run docker:logs        # or: docker-compose logs -f mysql
```

### Database Management

```bash
# Push schema changes to database
npm run db:push            # or: npx prisma db push

# Reset and reseed database
npm run db:reset           # or: npx prisma migrate reset

# Open Prisma Studio (GUI for database)
npm run prisma:studio
```

---

## 🔧 Environment Variables

Create a `.env` file in the `backend` directory with the following:

```env
# Database Configuration
DATABASE_URL="mysql://library_user:library_password@localhost:3306/library_lite"

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:5173
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

## 🛠️ Troubleshooting

### MySQL Connection Issues

If you encounter connection errors:

1. **Check if MySQL container is running:**
   ```bash
   docker-compose ps
   ```

2. **Check MySQL logs:**
   ```bash
   docker-compose logs mysql
   ```

3. **Restart MySQL container:**
   ```bash
   docker-compose restart mysql
   ```

4. **Reset everything:**
   ```bash
   npm run docker:reset
   cd backend && npx prisma db push
   ```

### Port Already in Use

If port 3306 is already in use:

1. **Stop existing MySQL service:**
   ```bash
   # macOS
   brew services stop mysql
   
   # Linux
   sudo systemctl stop mysql
   ```

2. **Or change the port in docker-compose.yml:**
   ```yaml
   ports:
     - "3307:3306"  # Use port 3307 instead
   ```
   Then update `DATABASE_URL` in `.env` to use port 3307.

---

## 📝 Migration from SQLite

If you're migrating from an older version that used SQLite, see [DATABASE_MIGRATION.md](./DATABASE_MIGRATION.md) for detailed instructions.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the ISC License.

---

## 👥 Authors

Created with ❤️ by the Library Lite team
