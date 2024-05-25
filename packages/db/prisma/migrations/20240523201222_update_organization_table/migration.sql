/*
  Warnings:

  - Added the required column `role` to the `experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cv"."experience" ADD COLUMN     "role" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "cv"."organization" ADD COLUMN     "role" TEXT NOT NULL;
