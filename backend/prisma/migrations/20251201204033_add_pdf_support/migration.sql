-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_books" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "googleId" TEXT,
    "title" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "description" TEXT,
    "thumbnail" TEXT,
    "publishedDate" TEXT,
    "pageCount" INTEGER,
    "categories" TEXT NOT NULL,
    "language" TEXT,
    "averageRating" REAL NOT NULL DEFAULT 0,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    "pdfUrl" TEXT,
    "previewUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_books" ("authors", "averageRating", "categories", "createdAt", "description", "googleId", "id", "language", "pageCount", "publishedDate", "ratingCount", "thumbnail", "title", "updatedAt") SELECT "authors", "averageRating", "categories", "createdAt", "description", "googleId", "id", "language", "pageCount", "publishedDate", "ratingCount", "thumbnail", "title", "updatedAt" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
CREATE UNIQUE INDEX "books_googleId_key" ON "books"("googleId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
