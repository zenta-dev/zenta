-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_creatorId_fkey";

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "updaterId" TEXT;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_updaterId_fkey" FOREIGN KEY ("updaterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
