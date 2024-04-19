-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "photo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TagToTech" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_TagToTech_AB_unique" ON "_TagToTech"("A", "B");

-- CreateIndex
CREATE INDEX "_TagToTech_B_index" ON "_TagToTech"("B");

-- AddForeignKey
ALTER TABLE "_TagToTech" ADD CONSTRAINT "_TagToTech_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToTech" ADD CONSTRAINT "_TagToTech_B_fkey" FOREIGN KEY ("B") REFERENCES "Tech"("id") ON DELETE CASCADE ON UPDATE CASCADE;
