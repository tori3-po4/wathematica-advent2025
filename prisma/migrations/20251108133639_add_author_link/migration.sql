/*
  Warnings:

  - Added the required column `author_link` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "author_link" TEXT NOT NULL;
