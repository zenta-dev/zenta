/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Tech` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hash]` on the table `TechVersion` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hash` to the `TechVersion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tech" ALTER COLUMN "homepage" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TechVersion" ADD COLUMN     "hash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tech_name_key" ON "Tech"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TechVersion_hash_key" ON "TechVersion"("hash");
