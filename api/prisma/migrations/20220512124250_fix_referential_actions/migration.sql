-- DropForeignKey
ALTER TABLE "Passenger" DROP CONSTRAINT "Passenger_reservationId_fkey";

-- DropForeignKey
ALTER TABLE "ReservedTrip" DROP CONSTRAINT "ReservedTrip_reservationId_fkey";

-- AddForeignKey
ALTER TABLE "Passenger" ADD CONSTRAINT "Passenger_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservedTrip" ADD CONSTRAINT "ReservedTrip_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
