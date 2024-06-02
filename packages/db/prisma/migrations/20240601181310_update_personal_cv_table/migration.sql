/*
  Warnings:

  - You are about to drop the column `image` on the `cv` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cv"."cv" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "cv"."personal" ADD COLUMN     "image" TEXT;
