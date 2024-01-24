/*
  Warnings:

  - Changed the type of `state` on the `publications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PublicationState" AS ENUM ('draft', 'publication');

-- AlterTable
ALTER TABLE "publications" DROP COLUMN "state",
ADD COLUMN     "state" "PublicationState" NOT NULL;
