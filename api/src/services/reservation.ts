import moment from "moment"
import { env, prisma } from "../config"
import { ApiError, getPrice, uid } from "../utils"

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

const getInSnipcartFormat = async (token: string) => {
  const reservation = await prisma.reservation.findFirst({
    include,
    where: { token },
  })

  if (!reservation) throw new ApiError(404, "Reservation not found.")

  const items = reservation.reservedTrips.map(reservedTrip => ({
    id: "" + reservedTrip.id,
    name: "Trip",
    description: `From ${reservedTrip.trip.cityFrom.name} to ${
      reservedTrip.trip.cityTo.name
    } at ${moment(reservedTrip.trip.departure).format("llll")}`,
    price: getPrice(reservedTrip.trip.price),
    url: `${env.snipcartApiUrl}/reservation/${token}/snipcart-format`,
    quantity: 1,
    maxQuantity: 1,
    minQuantity: 1,
  }))

  return items
}

export const reservationService = {
  create,
  addReservedTrip,
  deleteReservedTrip,
  deleteOne,
  getInSnipcartFormat,
}
