import moment from "moment"
import { prisma } from "../config"
import { uid } from "../utils"

const create = async () => {
  const reservation = await prisma.reservation.create({
    include: {
      reservedTrips: {
        include: {
          trip: {
            include: {
              cityFrom: true,
              cityTo: true,
              bus: true,
            },
          },
        },
      },
    },
    data: {
      token: uid(),
    },
  })
  return reservation
}

export const reservationService = {
  create,
}
