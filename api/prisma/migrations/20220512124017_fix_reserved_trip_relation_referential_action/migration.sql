-- DropForeignKey
ALTER TABLE "ReservedTicket" DROP CONSTRAINT "ReservedTicket_reservedTripId_fkey";

-- AddForeignKey
ALTER TABLE "ReservedTicket" ADD CONSTRAINT "ReservedTicket_reservedTripId_fkey" FOREIGN KEY ("reservedTripId") REFERENCES "ReservedTrip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
