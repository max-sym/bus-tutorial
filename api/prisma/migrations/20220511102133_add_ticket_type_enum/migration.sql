-- CreateEnum
CREATE TYPE "ReservedTicketType" AS ENUM ('ADULT', 'CHILD', 'INFANT');

-- AlterTable
ALTER TABLE "ReservedTicket" ADD COLUMN     "type" "ReservedTicketType" NOT NULL DEFAULT E'ADULT';
