/*
  Warnings:

  - You are about to drop the column `user_id` on the `publications` table. All the data in the column will be lost.
  - You are about to drop the column `original_user_id` on the `reposts` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `publications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_id` to the `reposts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "publications" DROP COLUMN "user_id",
ADD COLUMN     "author_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reposts" DROP COLUMN "original_user_id",
ADD COLUMN     "author_id" TEXT NOT NULL;
