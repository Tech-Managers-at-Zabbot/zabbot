/*
  Warnings:

  - You are about to drop the column `metadata` on the `AIConversationLog` table. All the data in the column will be lost.
  - You are about to drop the column `tokensUsed` on the `AIConversationLog` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `AIConversationSession` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `AIConversationSession` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Achievement` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Achievement` table. All the data in the column will be lost.
  - You are about to drop the column `iconUrl` on the `Achievement` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Achievement` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Attempt` table. All the data in the column will be lost.
  - You are about to drop the column `lastReviewed` on the `Flashcard` table. All the data in the column will be lost.
  - You are about to drop the column `sourceType` on the `Flashcard` table. All the data in the column will be lost.
  - You are about to drop the column `sparkId` on the `Flashcard` table. All the data in the column will be lost.
  - You are about to drop the column `vocabularyId` on the `Flashcard` table. All the data in the column will be lost.
  - You are about to drop the column `endedAt` on the `SparkSession` table. All the data in the column will be lost.
  - You are about to drop the column `cancelAtPeriodEnd` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `cancelledAt` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `trialEnd` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `trialStart` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `isDisplayed` on the `UserAchievement` table. All the data in the column will be lost.
  - You are about to drop the column `progress` on the `UserAchievement` table. All the data in the column will be lost.
  - You are about to drop the column `lastReviewed` on the `UserVocabularyProgress` table. All the data in the column will be lost.
  - You are about to drop the `sparks_new` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `UserLessonProgress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ContentBlock" DROP CONSTRAINT "ContentBlock_sparkId_fkey";

-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_sparkId_fkey";

-- DropForeignKey
ALTER TABLE "SparkSession" DROP CONSTRAINT "SparkSession_sparkId_fkey";

-- DropForeignKey
ALTER TABLE "UserLessonProgress" DROP CONSTRAINT "UserLessonProgress_sparkId_fkey";

-- DropForeignKey
ALTER TABLE "Vocabulary" DROP CONSTRAINT "Vocabulary_sparkId_fkey";

-- DropForeignKey
ALTER TABLE "XpTransaction" DROP CONSTRAINT "XpTransaction_sparkId_fkey";

-- DropForeignKey
ALTER TABLE "sparks_new" DROP CONSTRAINT "sparks_new_journeyId_fkey";

-- AlterTable
ALTER TABLE "AIConversationLog" DROP COLUMN "metadata",
DROP COLUMN "tokensUsed";

-- AlterTable
ALTER TABLE "AIConversationSession" DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Achievement" DROP COLUMN "category",
DROP COLUMN "description",
DROP COLUMN "iconUrl",
DROP COLUMN "order";

-- AlterTable
ALTER TABLE "Attempt" DROP COLUMN "content";

-- AlterTable
ALTER TABLE "AuditLog" ADD COLUMN     "metadata" JSONB;

-- AlterTable
ALTER TABLE "Flashcard" DROP COLUMN "lastReviewed",
DROP COLUMN "sourceType",
DROP COLUMN "sparkId",
DROP COLUMN "vocabularyId";

-- AlterTable
ALTER TABLE "SparkSession" DROP COLUMN "endedAt";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "cancelAtPeriodEnd",
DROP COLUMN "cancelledAt",
DROP COLUMN "trialEnd",
DROP COLUMN "trialStart";

-- AlterTable
ALTER TABLE "UserAchievement" DROP COLUMN "isDisplayed",
DROP COLUMN "progress";

-- AlterTable
ALTER TABLE "UserLessonProgress" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currentIndex" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "UserVocabularyProgress" DROP COLUMN "lastReviewed";

-- DropTable
DROP TABLE "sparks_new";

-- CreateTable
CREATE TABLE "Spark" (
    "id" TEXT NOT NULL,
    "journeyId" TEXT,
    "order" INTEGER NOT NULL DEFAULT 1,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "category" "SparkCategory" NOT NULL DEFAULT 'LANGUAGE',
    "difficulty" "Difficulty" NOT NULL DEFAULT 'BEGINNER',
    "xpReward" INTEGER NOT NULL DEFAULT 50,
    "imageThumbnail" TEXT,
    "bgColor" TEXT DEFAULT '#24A5EE',
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "timeEstimate" INTEGER DEFAULT 5,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Spark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Spark_slug_key" ON "Spark"("slug");

-- CreateIndex
CREATE INDEX "Spark_journeyId_idx" ON "Spark"("journeyId");

-- CreateIndex
CREATE INDEX "Spark_status_idx" ON "Spark"("status");

-- CreateIndex
CREATE INDEX "AuditLog_userId_idx" ON "AuditLog"("userId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Spark" ADD CONSTRAINT "Spark_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "Journey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentBlock" ADD CONSTRAINT "ContentBlock_sparkId_fkey" FOREIGN KEY ("sparkId") REFERENCES "Spark"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_sparkId_fkey" FOREIGN KEY ("sparkId") REFERENCES "Spark"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLessonProgress" ADD CONSTRAINT "UserLessonProgress_sparkId_fkey" FOREIGN KEY ("sparkId") REFERENCES "Spark"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vocabulary" ADD CONSTRAINT "Vocabulary_sparkId_fkey" FOREIGN KEY ("sparkId") REFERENCES "Spark"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "XpTransaction" ADD CONSTRAINT "XpTransaction_sparkId_fkey" FOREIGN KEY ("sparkId") REFERENCES "Spark"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SparkSession" ADD CONSTRAINT "SparkSession_sparkId_fkey" FOREIGN KEY ("sparkId") REFERENCES "Spark"("id") ON DELETE CASCADE ON UPDATE CASCADE;
