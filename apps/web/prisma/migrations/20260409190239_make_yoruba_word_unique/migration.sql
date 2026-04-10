/*
  Warnings:

  - A unique constraint covering the columns `[yorubaWord]` on the table `Vocabulary` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Vocabulary_yorubaWord_key" ON "Vocabulary"("yorubaWord");
