/*
  Warnings:

  - You are about to drop the column `message` on the `AIConversationLog` table. All the data in the column will be lost.
  - You are about to drop the column `english` on the `ContentBlock` table. All the data in the column will be lost.
  - You are about to drop the column `sourceLesson` on the `Flashcard` table. All the data in the column will be lost.
  - You are about to alter the column `order` on the `Journey` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the column `streakLastUpdated` on the `User` table. All the data in the column will be lost.
  - The `status` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `lessonId` on the `Vocabulary` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `sparks_new` table. All the data in the column will be lost.
  - The `difficulty` column on the `sparks_new` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `content` to the `AIConversationLog` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `role` on the `AIConversationLog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'DELETED');

-- CreateEnum
CREATE TYPE "ChatRole" AS ENUM ('USER', 'AI', 'SYSTEM');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- DropIndex
DROP INDEX "AIConversationLog_createdAt_idx";

-- AlterTable
ALTER TABLE "AIConversationLog" DROP COLUMN "message",
ADD COLUMN     "content" TEXT NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "ChatRole" NOT NULL;

-- AlterTable
ALTER TABLE "AIConversationSession" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ContentBlock" DROP COLUMN "english",
ADD COLUMN     "translation" TEXT;

-- AlterTable
ALTER TABLE "Flashcard" DROP COLUMN "sourceLesson";

-- AlterTable
ALTER TABLE "Journey" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "order" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "streakLastUpdated",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "lastStreakDate" TIMESTAMP(3),
DROP COLUMN "status",
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "Vocabulary" DROP COLUMN "lessonId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "englishTranslation" SET DEFAULT '';

-- AlterTable
ALTER TABLE "sparks_new" DROP COLUMN "category",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
DROP COLUMN "difficulty",
ADD COLUMN     "difficulty" "Difficulty" NOT NULL DEFAULT 'BEGINNER';

-- DropEnum
DROP TYPE "SparkCategory";

-- CreateIndex
CREATE INDEX "AIConversationLog_sessionId_createdAt_idx" ON "AIConversationLog"("sessionId", "createdAt");

-- CreateIndex
CREATE INDEX "ActivityLog_createdAt_idx" ON "ActivityLog"("createdAt");

-- CreateIndex
CREATE INDEX "Attempt_userId_idx" ON "Attempt"("userId");

-- CreateIndex
CREATE INDEX "Attempt_createdAt_idx" ON "Attempt"("createdAt");

-- CreateIndex
CREATE INDEX "Vocabulary_createdAt_idx" ON "Vocabulary"("createdAt");

-- CreateIndex
CREATE INDEX "Vocabulary_yorubaWord_idx" ON "Vocabulary"("yorubaWord");

-- CreateIndex
CREATE INDEX "Vocabulary_englishTranslation_idx" ON "Vocabulary"("englishTranslation");
