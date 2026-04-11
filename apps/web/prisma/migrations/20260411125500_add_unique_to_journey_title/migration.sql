/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Journey` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Journey_title_key" ON "Journey"("title");
