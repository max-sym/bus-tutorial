import moment from "moment"
import { prisma } from "../../config"

const getMany = async (filter: { [key: string]: string }) => {
  const dateFrom = moment(filter.departureDate, "DD-MM-YYYY")

  const result = await prisma.trip.findMany({
    include: {
      cityFrom: true,
      cityTo: true,
      bus: true,
    },
    where: {
      cityFrom: { is: { slug: filter.from } },
      cityTo: { is: { slug: filter.to } },
      departure: { gte: dateFrom.toDate(), lt: dateFrom.endOf("day").toDate() },
    },
  })
  return result
}

export const trip = {
  getMany,
}
