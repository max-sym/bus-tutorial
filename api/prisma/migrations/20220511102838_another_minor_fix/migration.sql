/*
  Warnings:

  - You are about to drop the column `type` on the `ReservedTicket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ReservedTicket" DROP COLUMN "type",
ADD COLUMN     "personType" "ReservedTicketType" NOT NULL DEFAULT E'ADULT';
