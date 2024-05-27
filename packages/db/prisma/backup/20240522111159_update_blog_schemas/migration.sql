/*
  Warnings:

  - You are about to drop the column `updateAt` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `post_comment` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `tag` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `tech` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `tech_founder` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `tech_version` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `education` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `experince` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `organization` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `other` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `personal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "blog"."post" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "blog"."post_comment" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "blog"."tag" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "blog"."tech" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "blog"."tech_founder" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "blog"."tech_version" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "cv"."education" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "cv"."experince" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "cv"."organization" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "cv"."other" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "cv"."personal" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;
