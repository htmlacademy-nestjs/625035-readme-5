/*
  Warnings:

  - You are about to drop the `link_publications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `photo_publications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quote_publications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `text_publications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `video_publications` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `quote_text` to the `publications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video_link` to the `publications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "link_publications" DROP CONSTRAINT "link_publications_publicationId_fkey";

-- DropForeignKey
ALTER TABLE "photo_publications" DROP CONSTRAINT "photo_publications_publicationId_fkey";

-- DropForeignKey
ALTER TABLE "quote_publications" DROP CONSTRAINT "quote_publications_publicationId_fkey";

-- DropForeignKey
ALTER TABLE "text_publications" DROP CONSTRAINT "text_publications_publicationId_fkey";

-- DropForeignKey
ALTER TABLE "video_publications" DROP CONSTRAINT "video_publications_publicationId_fkey";

-- AlterTable
ALTER TABLE "publications" ADD COLUMN     "announcement" TEXT,
ADD COLUMN     "announcement_text" TEXT,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "link_description" TEXT,
ADD COLUMN     "photo_id" TEXT,
ADD COLUMN     "quote_author" TEXT,
ADD COLUMN     "quote_text" TEXT NOT NULL,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "video_link" TEXT NOT NULL;

-- DropTable
DROP TABLE "link_publications";

-- DropTable
DROP TABLE "photo_publications";

-- DropTable
DROP TABLE "quote_publications";

-- DropTable
DROP TABLE "text_publications";

-- DropTable
DROP TABLE "video_publications";

-- CreateIndex
CREATE INDEX "publications_title_idx" ON "publications"("title");
