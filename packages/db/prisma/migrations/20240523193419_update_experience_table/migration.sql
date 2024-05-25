/*
  Warnings:

  - You are about to drop the `experince` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cv"."experince" DROP CONSTRAINT "experince_cvId_fkey";

-- DropTable
DROP TABLE "cv"."experince";

-- CreateTable
CREATE TABLE "cv"."experience" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL,
    "achievements" TEXT[],
    "document" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cvId" UUID NOT NULL,

    CONSTRAINT "experience_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cv"."experience" ADD CONSTRAINT "experience_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "cv"."cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;
