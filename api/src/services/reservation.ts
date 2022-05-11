import Prisma from "@prisma/client"
import moment from "moment"
import { env, prisma } from "../config"
import { ApiError, getPrice, uid } from "../utils"

const include = {
  reservedTrips: {
    include: {
      reservedTickets: true,
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
  const ticketGuestTypes = Object.keys(body.guests)
    .map(key => new Array(body.guests[key]).fill(key))
    .flat()

  const typesMap = {
    adults: Prisma.TicketPersonType["ADULT"],
    children: Prisma.TicketPersonType["CHILD"],
    infants: Prisma.TicketPersonType["INFANT"],
  }

  const tickets = ticketGuestTypes.map(ticketType => ({
    personType: typesMap[ticketType],
  }))

  const reservation = await prisma.reservation.update({
    include,
    data: {
      reservedTrips: {
        create: {
          tripId: body.tripId,
          reservedTickets: {
            createMany: {
              data: tickets,
            },
          },
        },
      },
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
  const reservation = await getOne(token)

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

const update = async (
  token: string,
  data: Partial<Prisma.Prisma.ReservationUpdateInput>
) => {
  const reservation = await prisma.reservation.update({
    include,
    data,
    where: { token },
  })

  return reservation
}

const getOne = async (token: string) => {
  const reservation = await prisma.reservation.findFirst({
    include,
    where: { token },
  })

  return reservation
}

export const reservationService = {
  create,
  addReservedTrip,
  deleteReservedTrip,
  deleteOne,
  getInSnipcartFormat,
  update,
  getOne,
}
