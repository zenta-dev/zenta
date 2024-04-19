/*
  Warnings:

  - You are about to drop the column `views` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "views",
ADD COLUMN     "heat" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "heat" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Tech" ADD COLUMN     "heat" INTEGER NOT NULL DEFAULT 0;
