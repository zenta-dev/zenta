-- CreateTable
CREATE TABLE "TechVersion" (
    "id" TEXT NOT NULL,
    "techId" TEXT NOT NULL,
    "whatNews" TEXT,
    "version" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "TechVersion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TechVersion" ADD CONSTRAINT "TechVersion_techId_fkey" FOREIGN KEY ("techId") REFERENCES "Tech"("id") ON DELETE CASCADE ON UPDATE CASCADE;
