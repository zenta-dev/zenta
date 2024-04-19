/*
  Warnings:

  - Added the required column `founderId` to the `Tech` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TechFounderType" AS ENUM ('PERSON', 'ORGANIZATION', 'COMPANY');

-- AlterTable
ALTER TABLE "Tech" ADD COLUMN     "founderId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "TechFounder" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT,
    "updaterId" TEXT,
    "name" TEXT NOT NULL,
    "type" "TechFounderType" NOT NULL DEFAULT 'PERSON',
    "url" TEXT NOT NULL,
    "photo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "TechFounder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TechFounder_name_key" ON "TechFounder"("name");

-- AddForeignKey
ALTER TABLE "TechFounder" ADD CONSTRAINT "TechFounder_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechFounder" ADD CONSTRAINT "TechFounder_updaterId_fkey" FOREIGN KEY ("updaterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tech" ADD CONSTRAINT "Tech_founderId_fkey" FOREIGN KEY ("founderId") REFERENCES "TechFounder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
