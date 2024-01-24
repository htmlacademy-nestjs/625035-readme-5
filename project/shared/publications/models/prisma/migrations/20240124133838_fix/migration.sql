/*
  Warnings:

  - Added the required column `state` to the `publications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "publications" ADD COLUMN     "state" TEXT NOT NULL;
