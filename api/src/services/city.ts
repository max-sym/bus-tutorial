import { prisma } from "../config"

const getMany = async (query: string) => {
  return await prisma.city.findMany({
    where: {
      slug: { contains: query },
    },
  })
}

export const cityService = {
  getMany,
}
