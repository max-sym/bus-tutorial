import Prisma from "@prisma/client"
import moment from "moment"
import { env, prisma } from "../../config"
import { ApiError, attachDiscount, getPrice, uid } from "../../utils"

const include = {
  passengers: {
    include: {
      reservedTickets: true,
    },
  },
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

const getOne = async (token: string, shouldAttachDiscount: boolean = true) => {
  const reservation = await prisma.reservation.findFirst({
    include,
    where: { token },
  })

  return shouldAttachDiscount ? attachDiscount(reservation) : reservation
}

export const reservation = {
  getOne,
}
