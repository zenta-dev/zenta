-- CreateTable
CREATE TABLE "Tech" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT,
    "updaterId" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "homepage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Tech_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tech" ADD CONSTRAINT "Tech_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tech" ADD CONSTRAINT "Tech_updaterId_fkey" FOREIGN KEY ("updaterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
