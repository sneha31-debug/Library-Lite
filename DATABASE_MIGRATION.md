# 🔄 Database Migration Guide: SQLite to MySQL

This guide explains the migration from SQLite to MySQL running in Docker for the Library-Lite application.

---

## 📋 Overview

### Why Migrate?

**Previous Setup (SQLite):**
- File-based database (`dev.db`)
- Good for development, limited for production
- Single-user access
- No network access

**New Setup (MySQL in Docker):**
- Industry-standard relational database
- Better performance and scalability
- Multi-user concurrent access
- Production-ready
- Easy deployment with Docker
- Consistent environment across development and production

---

## 🚀 Migration Steps

### For New Users

If you're setting up the project for the first time, simply follow the installation instructions in the [README.md](./README.md). The project is now configured to use MySQL by default.

### For Existing Users (Migrating from SQLite)

If you have an existing SQLite database with data you want to preserve:

#### Step 1: Backup Your SQLite Data

```bash
cd backend

# Create a backup directory
mkdir -p backups

# Copy your SQLite database
cp db/dev.db backups/dev.db.backup

# Export data using Prisma Studio (optional)
npx prisma studio
# Manually export important data if needed
```

#### Step 2: Pull Latest Changes

```bash
git pull origin main
```

#### Step 3: Start MySQL Container

```bash
# From project root
docker-compose up -d

# Verify MySQL is running
docker-compose ps
```

#### Step 4: Update Backend Configuration

```bash
cd backend

# Copy the new environment template
cp .env.example .env

# Edit .env and ensure DATABASE_URL is set to:
# DATABASE_URL="mysql://library_user:library_password@localhost:3306/library_lite"
```

#### Step 5: Install Dependencies and Setup Database

```bash
# Install any new dependencies
npm install

# Generate Prisma client for MySQL
npm run prisma:generate

# Push schema to MySQL
npx prisma db push

# Seed the database with initial data
npm run prisma:seed
```

#### Step 6: Manual Data Migration (If Needed)

If you have important user data in SQLite that you need to migrate:

**Option A: Manual Export/Import**

1. **Export from SQLite:**
   ```bash
   # Use Prisma Studio to view and export data
   npx prisma studio
   # Manually copy important records
   ```

2. **Import to MySQL:**
   ```bash
   # Start the new MySQL setup
   npx prisma studio
   # Manually create records in MySQL
   ```

**Option B: Using a Migration Script**

Create a custom migration script (example):

```javascript
// migrate-data.js
const { PrismaClient: SQLiteClient } = require('@prisma/client');
const { PrismaClient: MySQLClient } = require('@prisma/client');

// Configure for SQLite
const sqlite = new SQLiteClient({
  datasources: {
    db: {
      url: 'file:./db/dev.db'
    }
  }
});

// Configure for MySQL
const mysql = new MySQLClient({
  datasources: {
    db: {
      url: 'mysql://library_user:library_password@localhost:3306/library_lite'
    }
  }
});

async function migrate() {
  // Example: Migrate users
  const users = await sqlite.user.findMany();
  
  for (const user of users) {
    await mysql.user.create({
      data: user
    });
  }
  
  console.log('Migration complete!');
}

migrate()
  .catch(console.error)
  .finally(async () => {
    await sqlite.$disconnect();
    await mysql.$disconnect();
  });
```

> **Note:** For most development setups, reseeding the database is sufficient. Only migrate data if you have important user-generated content.

#### Step 7: Verify Migration

```bash
# Start the backend
npm run dev

# In another terminal, check the database
npx prisma studio
```

---

## 🔍 What Changed?

### Configuration Files

#### `docker-compose.yml` (NEW)
- Defines MySQL 8.0 container
- Sets up persistent volume for data
- Configures networking and health checks

#### `backend/prisma/schema.prisma` (MODIFIED)
```diff
datasource db {
-  provider = "sqlite"
+  provider = "mysql"
   url      = env("DATABASE_URL")
}

model User {
-  bio String?
+  bio String? @db.Text
}
```

#### `backend/.env` (MODIFIED)
```diff
-DATABASE_URL="file:./dev.db"
+DATABASE_URL="mysql://library_user:library_password@localhost:3306/library_lite"
```

#### `backend/package.json` (MODIFIED)
Added new scripts:
- `docker:up` - Start MySQL container
- `docker:down` - Stop MySQL container
- `docker:reset` - Reset database
- `docker:logs` - View MySQL logs
- `db:push` - Push schema changes
- `db:reset` - Reset and reseed database

---

## 🗄️ Database Differences

### SQLite vs MySQL

| Feature | SQLite | MySQL |
|---------|--------|-------|
| **Storage** | Single file | Server-based |
| **Concurrency** | Limited | High |
| **Text Fields** | `String` | `String @db.Text` |
| **Performance** | Good for small apps | Better for large apps |
| **Deployment** | File-based | Network-based |
| **Scalability** | Limited | High |

### Schema Changes

All long-text fields now use `@db.Text` annotation:
- `User.bio`
- `Book.description`
- `Rating.review`
- `Comment.content`
- `Post.content`

---

## 🐳 Docker Management

### Useful Commands

```bash
# Start MySQL
docker-compose up -d

# Stop MySQL
docker-compose down

# Stop and remove all data
docker-compose down -v

# View logs
docker-compose logs -f mysql

# Access MySQL CLI
docker-compose exec mysql mysql -u library_user -p
# Password: library_password

# Check container status
docker-compose ps

# Restart MySQL
docker-compose restart mysql
```

### Data Persistence

MySQL data is stored in a Docker volume named `mysql_data`. This ensures:
- Data persists across container restarts
- Data is not lost when stopping containers
- Easy backup and restore

To completely reset the database:
```bash
docker-compose down -v  # -v flag removes volumes
docker-compose up -d
cd backend && npx prisma db push
```

---

## 🔙 Rollback to SQLite

If you need to revert to SQLite:

1. **Stop MySQL:**
   ```bash
   docker-compose down
   ```

2. **Revert Prisma schema:**
   ```bash
   cd backend/prisma
   # Edit schema.prisma
   # Change provider from "mysql" to "sqlite"
   ```

3. **Update .env:**
   ```bash
   DATABASE_URL="file:./dev.db"
   ```

4. **Restore backup:**
   ```bash
   cp backups/dev.db.backup db/dev.db
   ```

5. **Regenerate Prisma client:**
   ```bash
   npx prisma generate
   npm run dev
   ```

---

## ❓ FAQ

### Q: Do I need to keep Docker running?
**A:** Yes, the MySQL container must be running for the application to work. Start it with `docker-compose up -d`.

### Q: Can I use an external MySQL server instead of Docker?
**A:** Yes! Just update the `DATABASE_URL` in `.env` to point to your MySQL server:
```env
DATABASE_URL="mysql://username:password@your-server:3306/database_name"
```

### Q: How do I backup my MySQL data?
**A:** Use Docker volume backup or MySQL dump:
```bash
# MySQL dump
docker-compose exec mysql mysqldump -u library_user -p library_lite > backup.sql

# Restore
docker-compose exec -T mysql mysql -u library_user -p library_lite < backup.sql
```

### Q: What if port 3306 is already in use?
**A:** Change the port mapping in `docker-compose.yml`:
```yaml
ports:
  - "3307:3306"
```
Then update `DATABASE_URL` to use port 3307.

### Q: How do I view the database?
**A:** Use Prisma Studio:
```bash
cd backend
npm run prisma:studio
```
Or connect with any MySQL client using the credentials from `docker-compose.yml`.

---

## 🆘 Troubleshooting

### Issue: "Can't connect to MySQL server"

**Solution:**
```bash
# Check if container is running
docker-compose ps

# Check logs
docker-compose logs mysql

# Restart container
docker-compose restart mysql
```

### Issue: "Error: P1001: Can't reach database server"

**Solution:**
1. Ensure Docker is running
2. Check `DATABASE_URL` in `.env`
3. Verify MySQL container is healthy: `docker-compose ps`

### Issue: "Table doesn't exist"

**Solution:**
```bash
# Push schema to database
cd backend
npx prisma db push
```

### Issue: "Authentication failed"

**Solution:**
Check credentials in `.env` match those in `docker-compose.yml`:
- Username: `library_user`
- Password: `library_password`
- Database: `library_lite`

---

## 📚 Additional Resources

- [Prisma MySQL Documentation](https://www.prisma.io/docs/concepts/database-connectors/mysql)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [MySQL 8.0 Documentation](https://dev.mysql.com/doc/refman/8.0/en/)

---

**Need help?** Open an issue on GitHub or contact the development team.
