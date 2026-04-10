-- CreateEnum
CREATE TYPE "SparkCategory" AS ENUM ('CULTURE', 'LANGUAGE', 'STORYTELLING', 'GRAMMAR', 'PRACTICE');

-- AlterTable
ALTER TABLE "Journey" ADD COLUMN     "color" TEXT DEFAULT '#162B6E',
ADD COLUMN     "icon" TEXT;

-- AlterTable
ALTER TABLE "sparks_new" ADD COLUMN     "category" "SparkCategory" NOT NULL DEFAULT 'LANGUAGE';
