-- CreateTable
CREATE TABLE "Trip" (
    "id" SERIAL NOT NULL,
    "departure" TIMESTAMP(3) NOT NULL,
    "arrival" TIMESTAMP(3) NOT NULL,
    "cityFromId" INTEGER NOT NULL,
    "cityToId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_cityFromId_fkey" FOREIGN KEY ("cityFromId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_cityToId_fkey" FOREIGN KEY ("cityToId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
