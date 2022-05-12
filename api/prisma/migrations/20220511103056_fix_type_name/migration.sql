/*
  Warnings:

  - The `personType` column on the `ReservedTicket` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TicketPersonType" AS ENUM ('ADULT', 'CHILD', 'INFANT');

-- AlterTable
ALTER TABLE "ReservedTicket" DROP COLUMN "personType",
ADD COLUMN     "personType" "TicketPersonType" NOT NULL DEFAULT E'ADULT';

-- DropEnum
DROP TYPE "ReservedTicketType";
