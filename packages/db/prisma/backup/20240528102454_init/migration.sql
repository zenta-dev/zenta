-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "blog";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "cv";

-- CreateEnum
CREATE TYPE "blog"."tech_founder_type" AS ENUM ('PERSON', 'ORGANIZATION', 'COMPANY');

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
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "other_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cv"."organization" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "cvId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL,
    "achievements" TEXT[],
    "document" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cv"."experience" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
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
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "personal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cv"."cv" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "image" TEXT,
    "personalId" UUID,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog"."tech_founder" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "type" "blog"."tech_founder_type" NOT NULL DEFAULT 'PERSON',
    "url" TEXT NOT NULL,
    "photo" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tech_founder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog"."tech_version" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "hash" TEXT NOT NULL,
    "version" DOUBLE PRECISION NOT NULL,
    "whatNews" TEXT,
    "description" TEXT,
    "url" TEXT,
    "techId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tech_version_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog"."tech" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "homepage" TEXT,
    "color" TEXT,
    "heat" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tech_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog"."tag" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "photo" TEXT,
    "color" TEXT,
    "heat" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog"."post_comment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "content" JSONB NOT NULL,
    "parentId" UUID,
    "postId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID,

    CONSTRAINT "post_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog"."post_author" (
    "postId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "post_author_pkey" PRIMARY KEY ("postId","userId")
);

-- CreateTable
CREATE TABLE "blog"."post" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "cover" TEXT,
    "content" JSONB NOT NULL,
    "summary" TEXT,
    "related" TEXT[],
    "heat" INTEGER NOT NULL DEFAULT 0,
    "readTime" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog"."_tech_to_founder" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "blog"."_post_to_tag" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "blog"."_post_to_tech" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tech_founder_name_key" ON "blog"."tech_founder"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tech_version_hash_key" ON "blog"."tech_version"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "tech_name_key" ON "blog"."tech"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tag_name_key" ON "blog"."tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "post_slug_key" ON "blog"."post"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_tech_to_founder_AB_unique" ON "blog"."_tech_to_founder"("A", "B");

-- CreateIndex
CREATE INDEX "_tech_to_founder_B_index" ON "blog"."_tech_to_founder"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_post_to_tag_AB_unique" ON "blog"."_post_to_tag"("A", "B");

-- CreateIndex
CREATE INDEX "_post_to_tag_B_index" ON "blog"."_post_to_tag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_post_to_tech_AB_unique" ON "blog"."_post_to_tech"("A", "B");

-- CreateIndex
CREATE INDEX "_post_to_tech_B_index" ON "blog"."_post_to_tech"("B");

-- AddForeignKey
ALTER TABLE "cv"."other" ADD CONSTRAINT "other_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "cv"."cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cv"."organization" ADD CONSTRAINT "organization_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "cv"."cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cv"."experience" ADD CONSTRAINT "experience_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "cv"."cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cv"."education" ADD CONSTRAINT "education_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "cv"."cv"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cv"."cv" ADD CONSTRAINT "cv_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "cv"."personal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog"."tech_version" ADD CONSTRAINT "tech_version_techId_fkey" FOREIGN KEY ("techId") REFERENCES "blog"."tech"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog"."post_comment" ADD CONSTRAINT "post_comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "blog"."post_comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog"."post_comment" ADD CONSTRAINT "post_comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "blog"."post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog"."post_author" ADD CONSTRAINT "post_author_postId_fkey" FOREIGN KEY ("postId") REFERENCES "blog"."post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog"."_tech_to_founder" ADD CONSTRAINT "_tech_to_founder_A_fkey" FOREIGN KEY ("A") REFERENCES "blog"."tech"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog"."_tech_to_founder" ADD CONSTRAINT "_tech_to_founder_B_fkey" FOREIGN KEY ("B") REFERENCES "blog"."tech_founder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog"."_post_to_tag" ADD CONSTRAINT "_post_to_tag_A_fkey" FOREIGN KEY ("A") REFERENCES "blog"."post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog"."_post_to_tag" ADD CONSTRAINT "_post_to_tag_B_fkey" FOREIGN KEY ("B") REFERENCES "blog"."tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog"."_post_to_tech" ADD CONSTRAINT "_post_to_tech_A_fkey" FOREIGN KEY ("A") REFERENCES "blog"."post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog"."_post_to_tech" ADD CONSTRAINT "_post_to_tech_B_fkey" FOREIGN KEY ("B") REFERENCES "blog"."tech"("id") ON DELETE CASCADE ON UPDATE CASCADE;
