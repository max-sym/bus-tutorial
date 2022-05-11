import Prisma from "@prisma/client"
import moment from "moment"
import { env, prisma } from "../config"
import { ApiError, getPrice, uid } from "../utils"

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

const getOne = async (token: string) => {
  const reservation = await prisma.reservation.findFirst({
    include,
    where: { token },
  })

  return reservation
}

type GuestType = {
  adults: number
  children: number
  infants: number
}

type TicketGuestType = keyof GuestType

const create = async body => {
  const bodyGuests = body.guests as GuestType

  const ticketGuestTypes: TicketGuestType[] = Object.keys(bodyGuests)
    .map(key => new Array(bodyGuests[key]).fill(key))
    .flat()

  const typesMap = {
    adults: Prisma.PassengerType["ADULT"],
    children: Prisma.PassengerType["CHILD"],
    infants: Prisma.PassengerType["INFANT"],
  }

  const passengersData = ticketGuestTypes.map(ticketType => ({
    personType: typesMap[ticketType],
  }))

  const reservation = await prisma.reservation.create({
    include,
    data: {
      token: uid(),
      passengers: { createMany: { data: passengersData } },
      expiresAt: moment().add(10, "minutes").toDate(),
    },
  })
  return reservation
}

const addReservedTrip = async (token: string, body) => {
  const reservation = await getOne(token)

  const reservedTicketData = reservation.passengers.map(passenger => ({
    passengerId: passenger.id,
  }))

  await prisma.reservedTrip.create({
    data: {
      tripId: body.tripId,
      reservationId: reservation.id,
      reservedTickets: {
        createMany: {
          data: reservedTicketData,
        },
      },
    },
  })

  return await getOne(token)
}

const updatePassengers = async (token: string, passengers: any) => {
  const reservation = await getOne(token)

  const promises = reservation.passengers.map(async passenger => {
    const passengerUpdate = passengers.find(p => p.id === passenger.id)
    if (!passengerUpdate) return

    return await prisma.passenger.update({
      data: passengerUpdate,
      where: {
        id: passenger.id,
      },
    })
  })

  await Promise.all(promises)

  return await getOne(token)
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

export const reservationService = {
  create,
  addReservedTrip,
  deleteReservedTrip,
  deleteOne,
  getInSnipcartFormat,
  update,
  getOne,
  updatePassengers,
}
