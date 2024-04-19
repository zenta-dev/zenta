/*
  Warnings:

  - You are about to drop the column `founderId` on the `Tech` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tech" DROP CONSTRAINT "Tech_founderId_fkey";

-- AlterTable
ALTER TABLE "Tech" DROP COLUMN "founderId";

-- CreateTable
CREATE TABLE "_TechToTechFounder" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TechToTechFounder_AB_unique" ON "_TechToTechFounder"("A", "B");

-- CreateIndex
CREATE INDEX "_TechToTechFounder_B_index" ON "_TechToTechFounder"("B");

-- AddForeignKey
ALTER TABLE "_TechToTechFounder" ADD CONSTRAINT "_TechToTechFounder_A_fkey" FOREIGN KEY ("A") REFERENCES "Tech"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TechToTechFounder" ADD CONSTRAINT "_TechToTechFounder_B_fkey" FOREIGN KEY ("B") REFERENCES "TechFounder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
