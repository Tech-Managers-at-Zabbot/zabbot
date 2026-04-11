/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Journey` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Journey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Journey" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Journey_slug_key" ON "Journey"("slug");
