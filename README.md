# 📚 Library Lite

**Library Lite** is a full-stack digital library management system built with **Next.js**, **Node.js**, and **Prisma**.  
It allows users to browse, borrow, and manage books with secure authentication and an interactive UI.

---

## 🚀 Features

- 🏠 **Home Page** – Overview of the library with navigation.  
- 📚 **Browse Books** – View available books with search and filter.  
- 🔐 **User Authentication** – Secure login/signup using Prisma + JWT/OAuth.  
- 👤 **Dashboard** – Personalized dashboard showing user activity and borrowed books.  
- 📞 **Contact Page** – For user queries and feedback.  
- 🎨 **Responsive Design** – Works smoothly on all devices.  

---

## 🛠️ Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | Next.js (React), CSS Modules |
| **Backend** | Node.js, Express.js |
| **Database** | Prisma ORM with PostgreSQL / Supabase |
| **Authentication** | JWT / OAuth (Google Login) |
| **Styling** | Global CSS + Component-level styling |
| **Version Control** | Git & GitHub |

---

## 📂 Folder Structure

Library-Lite/
│
├── backend/
│ ├── node_modules/
│ ├── prisma/
│ │ └── schema.prisma # Prisma schema (models + DB config)
│ ├── src/
│ │ ├── db.js # Database connection setup
│ │ └── index.js # Express app entry point
│ ├── prisma.config.ts # Prisma TypeScript config
│ ├── package.json # Backend dependencies
│ ├── package-lock.json
│ ├── .gitignore
│ └── .DS_Store
│
├── frontend/
│ ├── public/ # Static assets (SVGs, icons, etc.)
│ │ ├── file.svg
│ │ ├── globe.svg
│ │ ├── next.svg
│ │ ├── vercel.svg
│ │ └── window.svg
│ ├── src/ # Next.js App Router code
│ ├── jsconfig.json
│ ├── next.config.mjs
│ ├── eslint.config.mjs
│ ├── package.json
│ ├── package-lock.json
│ ├── README.md
│ ├── .gitignore
│ └── .DS_Store
│
├── .gitignore
└── README.md # Project documentation
