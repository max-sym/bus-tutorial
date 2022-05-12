/*
  Warnings:

  - You are about to drop the column `passngerId` on the `ReservedTicket` table. All the data in the column will be lost.
  - Added the required column `passengerId` to the `ReservedTicket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ReservedTicket" DROP CONSTRAINT "ReservedTicket_passngerId_fkey";

-- AlterTable
ALTER TABLE "ReservedTicket" DROP COLUMN "passngerId",
ADD COLUMN     "passengerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ReservedTicket" ADD CONSTRAINT "ReservedTicket_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "Passenger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
