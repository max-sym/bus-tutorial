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
      expiresAt: moment().add(10, "minutes").toDate(),
    },
  })
  return reservation
}

const addReservedTrip = async (token: string, body) => {
  const reservation = await prisma.reservation.update({
    include,
    data: {
      reservedTrips: { create: { tripId: body.tripId } },
    },
    where: { token },
  })

  return reservation
}

const deleteReservedTrip = async (token: string, reservedTripId: number) => {
  const result = await prisma.reservation.update({
    include,
    data: {
      reservedTrips: { delete: { id: reservedTripId } },
    },
    where: { token },
  })

  return result
}

const deleteOne = async (token: string) => {
  const result = await prisma.reservation.delete({
    include,
    where: { token },
  })

  return result
}

export const reservationService = {
  create,
  addReservedTrip,
  deleteReservedTrip,
  deleteOne,
}
