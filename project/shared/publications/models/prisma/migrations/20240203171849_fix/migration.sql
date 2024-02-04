/*
  Warnings:

  - You are about to drop the column `isPublised` on the `publications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "publications" DROP COLUMN "isPublised",
ADD COLUMN     "isPublished" BOOLEAN DEFAULT true;
