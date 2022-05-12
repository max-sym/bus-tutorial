-- AlterTable
ALTER TABLE "User" ADD COLUMN     "acceptedPrivacy" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "isEmailVerified" SET DEFAULT false;
