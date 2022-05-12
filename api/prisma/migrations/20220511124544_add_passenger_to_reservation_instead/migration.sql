/*
  Warnings:

  - You are about to drop the column `citizenId` on the `ReservedTicket` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `ReservedTicket` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ReservedTicket` table. All the data in the column will be lost.
  - You are about to drop the column `personType` on the `ReservedTicket` table. All the data in the column will be lost.
  - Added the required column `passngerId` to the `ReservedTicket` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PassengerType" AS ENUM ('ADULT', 'CHILD', 'INFANT');

-- AlterTable
ALTER TABLE "ReservedTicket" DROP COLUMN "citizenId",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "personType",
ADD COLUMN     "passngerId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "TicketPersonType";

-- CreateTable
CREATE TABLE "Passenger" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "citizenId" TEXT,
    "personType" "PassengerType" NOT NULL DEFAULT E'ADULT',
    "reservationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Passenger_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReservedTicket" ADD CONSTRAINT "ReservedTicket_passngerId_fkey" FOREIGN KEY ("passngerId") REFERENCES "Passenger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Passenger" ADD CONSTRAINT "Passenger_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
