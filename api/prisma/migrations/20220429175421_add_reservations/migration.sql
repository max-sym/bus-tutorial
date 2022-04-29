-- CreateEnum
CREATE TYPE "ReservationState" AS ENUM ('CREATED', 'PAID', 'ONBOARDED');

-- CreateTable
CREATE TABLE "ReservedTrip" (
    "id" SERIAL NOT NULL,
    "tripId" INTEGER NOT NULL,
    "reservationId" INTEGER NOT NULL,

    CONSTRAINT "ReservedTrip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "state" "ReservationState" NOT NULL DEFAULT E'CREATED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_token_key" ON "Reservation"("token");

-- AddForeignKey
ALTER TABLE "ReservedTrip" ADD CONSTRAINT "ReservedTrip_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservedTrip" ADD CONSTRAINT "ReservedTrip_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
