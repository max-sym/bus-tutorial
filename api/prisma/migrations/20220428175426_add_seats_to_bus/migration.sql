/*
  Warnings:

  - Added the required column `seats` to the `Bus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bus" ADD COLUMN     "seats" INTEGER NOT NULL;
