import { prisma } from "../config"

const getMany = async (query: string) => {
  return await prisma.city.findMany({
    where: {
      slug: { contains: query },
    },
  })
}

const getSome = async (cities: string) => {
  return await prisma.city.findMany({
    where: {
      slug: { in: cities.split(",") },
    },
  })
}

export const cityService = {
  getMany,
  getSome,
}
