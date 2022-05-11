/*
  Warnings:

  - Added the required column `updatedAt` to the `ReservedTicket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ReservedTrip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReservedTicket" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "citizenId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ReservedTrip" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
