import moment from "moment"
import { prisma } from "../config"
import { uid } from "../utils"

const include = {
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
}

const create = async () => {
  const reservation = await prisma.reservation.create({
    include,
    data: {
      token: uid(),
    },
  })
  return reservation
}

const addReservedTrip = async (token: string, body) => {
  const reservation = await prisma.reservation.update({
    include,
    data: {
      reservedTrips: {
        create: {
          tripId: body.tripId,
        },
      },
    },
    where: { token },
  })
  return reservation
}

export const reservationService = {
  create,
  addReservedTrip,
}
