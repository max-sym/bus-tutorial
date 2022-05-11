/*
  Warnings:

  - The `state` column on the `ReservedTicket` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ReservedTicket" DROP COLUMN "state",
ADD COLUMN     "state" "TicketState" NOT NULL DEFAULT E'CREATED';
