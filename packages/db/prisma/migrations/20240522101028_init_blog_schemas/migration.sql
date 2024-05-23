-- CreateEnum
CREATE TYPE "blog"."tech_founder_type" AS ENUM ('PERSON', 'ORGANIZATION', 'COMPANY');

-- CreateTable
CREATE TABLE "blog"."tech_founder" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "type" "blog"."tech_founder_type" NOT NULL DEFAULT 'PERSON',
    "url" TEXT NOT NULL,
    "photo" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
    "updateAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
    "updateAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
    "updateAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog"."post_comment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "content" JSONB NOT NULL,
    "parentId" UUID,
    "postId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
    "updateAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog"."_TechToTechFounder" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "blog"."_PostToTag" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "blog"."_PostToTech" (
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
CREATE UNIQUE INDEX "_TechToTechFounder_AB_unique" ON "blog"."_TechToTechFounder"("A", "B");

-- CreateIndex
CREATE INDEX "_TechToTechFounder_B_index" ON "blog"."_TechToTechFounder"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PostToTag_AB_unique" ON "blog"."_PostToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToTag_B_index" ON "blog"."_PostToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PostToTech_AB_unique" ON "blog"."_PostToTech"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToTech_B_index" ON "blog"."_PostToTech"("B");

-- AddForeignKey
ALTER TABLE "blog"."tech_version" ADD CONSTRAINT "tech_version_techId_fkey" FOREIGN KEY ("techId") REFERENCES "blog"."tech"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog"."post_comment" ADD CONSTRAINT "post_comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "blog"."post_comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog"."post_comment" ADD CONSTRAINT "post_comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "blog"."post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog"."post_author" ADD CONSTRAINT "post_author_postId_fkey" FOREIGN KEY ("postId") REFERENCES "blog"."post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog"."_TechToTechFounder" ADD CONSTRAINT "_TechToTechFounder_A_fkey" FOREIGN KEY ("A") REFERENCES "blog"."tech"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog"."_TechToTechFounder" ADD CONSTRAINT "_TechToTechFounder_B_fkey" FOREIGN KEY ("B") REFERENCES "blog"."tech_founder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog"."_PostToTag" ADD CONSTRAINT "_PostToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "blog"."post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog"."_PostToTag" ADD CONSTRAINT "_PostToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "blog"."tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog"."_PostToTech" ADD CONSTRAINT "_PostToTech_A_fkey" FOREIGN KEY ("A") REFERENCES "blog"."post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog"."_PostToTech" ADD CONSTRAINT "_PostToTech_B_fkey" FOREIGN KEY ("B") REFERENCES "blog"."tech"("id") ON DELETE CASCADE ON UPDATE CASCADE;
