/*
  Warnings:

  - The primary key for the `books` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `authors` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `averageRating` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `categories` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `googleId` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `pageCount` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `publishedDate` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `ratingCount` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `books` table. All the data in the column will be lost.
  - The primary key for the `comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `posts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `image` on the `posts` table. All the data in the column will be lost.
  - The primary key for the `ratings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `follows` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post_likes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_books` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[isbn]` on the table `books` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `author` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genre` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isbn` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_userId_fkey`;

-- DropForeignKey
ALTER TABLE `follows` DROP FOREIGN KEY `follows_followerId_fkey`;

-- DropForeignKey
ALTER TABLE `follows` DROP FOREIGN KEY `follows_followingId_fkey`;

-- DropForeignKey
ALTER TABLE `post_likes` DROP FOREIGN KEY `post_likes_postId_fkey`;

-- DropForeignKey
ALTER TABLE `post_likes` DROP FOREIGN KEY `post_likes_userId_fkey`;

-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `posts_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ratings` DROP FOREIGN KEY `ratings_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `ratings` DROP FOREIGN KEY `ratings_userId_fkey`;

-- DropForeignKey
ALTER TABLE `user_books` DROP FOREIGN KEY `user_books_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `user_books` DROP FOREIGN KEY `user_books_userId_fkey`;

-- DropIndex
DROP INDEX `books_googleId_key` ON `books`;

-- AlterTable
ALTER TABLE `books` DROP PRIMARY KEY,
    DROP COLUMN `authors`,
    DROP COLUMN `averageRating`,
    DROP COLUMN `categories`,
    DROP COLUMN `description`,
    DROP COLUMN `googleId`,
    DROP COLUMN `language`,
    DROP COLUMN `pageCount`,
    DROP COLUMN `publishedDate`,
    DROP COLUMN `ratingCount`,
    DROP COLUMN `thumbnail`,
    ADD COLUMN `author` VARCHAR(191) NOT NULL,
    ADD COLUMN `genre` VARCHAR(191) NOT NULL,
    ADD COLUMN `isbn` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `comments` DROP PRIMARY KEY,
    ADD COLUMN `postId` VARCHAR(191) NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `bookId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `posts` DROP PRIMARY KEY,
    DROP COLUMN `image`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `ratings` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `bookId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `follows`;

-- DropTable
DROP TABLE `post_likes`;

-- DropTable
DROP TABLE `user_books`;

-- CreateIndex
CREATE UNIQUE INDEX `books_isbn_key` ON `books`(`isbn`);

-- CreateIndex
CREATE INDEX `books_userId_idx` ON `books`(`userId`);

-- CreateIndex
CREATE INDEX `books_genre_idx` ON `books`(`genre`);

-- CreateIndex
CREATE INDEX `books_isbn_idx` ON `books`(`isbn`);

-- CreateIndex
CREATE INDEX `comments_postId_idx` ON `comments`(`postId`);

-- CreateIndex
CREATE INDEX `posts_createdAt_idx` ON `posts`(`createdAt`);

-- CreateIndex
CREATE INDEX `ratings_rating_idx` ON `ratings`(`rating`);

-- CreateIndex
CREATE INDEX `users_email_idx` ON `users`(`email`);

-- CreateIndex
CREATE INDEX `users_username_idx` ON `users`(`username`);

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ratings` ADD CONSTRAINT `ratings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ratings` ADD CONSTRAINT `ratings_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `comments` RENAME INDEX `comments_bookId_fkey` TO `comments_bookId_idx`;

-- RenameIndex
ALTER TABLE `comments` RENAME INDEX `comments_userId_fkey` TO `comments_userId_idx`;

-- RenameIndex
ALTER TABLE `posts` RENAME INDEX `posts_userId_fkey` TO `posts_userId_idx`;

-- RenameIndex
ALTER TABLE `ratings` RENAME INDEX `ratings_bookId_fkey` TO `ratings_bookId_idx`;
