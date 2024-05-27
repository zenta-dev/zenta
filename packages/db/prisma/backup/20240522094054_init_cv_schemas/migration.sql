-- CreateTable
CREATE TABLE "cv"."other" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "cvId" UUID NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "month" INTEGER,
    "year" INTEGER,
    "achievements" TEXT[],
    "document" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "other_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cv"."organization" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "cvId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL,
    "achievements" TEXT[],
    "document" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cv"."experince" (
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
    "updateAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cvId" UUID NOT NULL,

    CONSTRAINT "experince_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cv"."education" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "gpa" DOUBLE PRECISION NOT NULL,
    "maxGPA" DOUBLE PRECISION NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "graduate" TIMESTAMP(3),
    "activities" TEXT[],
    "active" BOOLEAN NOT NULL,
    "document" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cvId" UUID NOT NULL,

    CONSTRAINT "education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cv"."personal" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "linkedinUrl" TEXT,
    "portfolioUrl" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "personal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cv"."cv" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "personalId" UUID,
    "authUserId" UUID NOT NULL,

    CONSTRAINT "cv_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cv"."other" ADD CONSTRAINT "other_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "cv"."cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cv"."organization" ADD CONSTRAINT "organization_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "cv"."cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cv"."experince" ADD CONSTRAINT "experince_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "cv"."cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cv"."education" ADD CONSTRAINT "education_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "cv"."cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cv"."cv" ADD CONSTRAINT "cv_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "cv"."personal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
