-- AlterTable
ALTER TABLE "Session" ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("sessionToken");

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "color" TEXT;

-- AlterTable
ALTER TABLE "Tech" ADD COLUMN     "color" TEXT;
