import * as seedData from "./seed-data"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  await prisma.city.createMany({
    data: seedData.cities.slice(0, 12),
  })

  const cities = await prisma.city.findMany()

  await prisma.bus.createMany({
    data: seedData.bus,
  })

  const buses = await prisma.bus.findMany()

  const trips = await prisma.trip.createMany({
    data: seedData.getFakeTrips({ cities, buses }),
  })

  console.log({ cities, trips })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
