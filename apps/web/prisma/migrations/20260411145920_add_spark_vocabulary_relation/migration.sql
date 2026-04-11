-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO', 'AUDIO');

-- DropIndex
DROP INDEX "Journey_title_key";

-- CreateTable
CREATE TABLE "SparkVocabulary" (
    "id" TEXT NOT NULL,
    "sparkId" TEXT NOT NULL,
    "vocabularyId" TEXT NOT NULL,

    CONSTRAINT "SparkVocabulary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "alt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "journeyId" TEXT,
    "sparkId" TEXT,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SparkVocabulary_sparkId_idx" ON "SparkVocabulary"("sparkId");

-- CreateIndex
CREATE INDEX "SparkVocabulary_vocabularyId_idx" ON "SparkVocabulary"("vocabularyId");

-- CreateIndex
CREATE UNIQUE INDEX "SparkVocabulary_sparkId_vocabularyId_key" ON "SparkVocabulary"("sparkId", "vocabularyId");

-- CreateIndex
CREATE INDEX "Media_journeyId_idx" ON "Media"("journeyId");

-- CreateIndex
CREATE INDEX "Media_sparkId_idx" ON "Media"("sparkId");

-- AddForeignKey
ALTER TABLE "SparkVocabulary" ADD CONSTRAINT "SparkVocabulary_sparkId_fkey" FOREIGN KEY ("sparkId") REFERENCES "Spark"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SparkVocabulary" ADD CONSTRAINT "SparkVocabulary_vocabularyId_fkey" FOREIGN KEY ("vocabularyId") REFERENCES "Vocabulary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "Journey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_sparkId_fkey" FOREIGN KEY ("sparkId") REFERENCES "Spark"("id") ON DELETE CASCADE ON UPDATE CASCADE;
