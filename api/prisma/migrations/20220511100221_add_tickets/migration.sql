-- CreateEnum
CREATE TYPE "TicketState" AS ENUM ('CREATED', 'ONBOARDED');

-- CreateTable
CREATE TABLE "ReservedTicket" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "citizenId" TEXT NOT NULL,
    "state" "ReservationState" NOT NULL DEFAULT E'CREATED',
    "reservedTripId" INTEGER NOT NULL,

    CONSTRAINT "ReservedTicket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReservedTicket" ADD CONSTRAINT "ReservedTicket_reservedTripId_fkey" FOREIGN KEY ("reservedTripId") REFERENCES "ReservedTrip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
