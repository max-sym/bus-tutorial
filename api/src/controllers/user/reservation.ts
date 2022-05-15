import { ApiError, catchAsync } from "../../utils"
import Prisma from "@prisma/client"
import { services } from "../../services"

const create = catchAsync(async (req, res) => {
  const result = await services.user.reservation.create(req.user, req.body)

  res.send(result)
})

const addReservedTrip = catchAsync(async (req, res) => {
  const token = req.params.token
  const result = await services.user.reservation.addReservedTrip(
    token,
    req.body
  )

  res.send(result)
})

const getMany = catchAsync(async (req, res) => {
  const result = await services.user.reservation.getMany(req.user)

  res.send(result)
})

const getOne = catchAsync(async (req, res) => {
  const result = await services.user.reservation.getOne(req.params.token)

  res.send(result)
})

const updatePassengers = catchAsync(async (req, res) => {
  const token = req.params.token
  const result = await services.user.reservation.updatePassengers(
    token,
    req.body.passengers
  )

  res.send(result)
})

const deleteReservedTrip = catchAsync(async (req, res) => {
  const token = req.params.token
  const reservedTripId = +req.params.reservedTripId
  const result = await services.user.reservation.deleteReservedTrip(
    token,
    reservedTripId
  )

  res.send(result)
})

const deleteOne = catchAsync(async (req, res) => {
  const token = req.params.token
  const result = await services.user.reservation.deleteOne(token)

  res.send(result)
})

const getInSnipcartFormat = catchAsync(async (req, res) => {
  const token = req.params.token
  const result = await services.user.reservation.getInSnipcartFormat(token)

  res.json(result)
})

const snipcartWebhooks = catchAsync(async (req, res) => {
  const body = req.body

  if (body.eventName !== "order.completed") {
    res.json("ok")
    return
  }

  const reservationToken = body.content.metadata.reservationToken

  if (!reservationToken)
    throw new ApiError(400, "Reservation token not provided")

  const data = {
    state: "PAID" as Prisma.ReservationState,
  }

  const reservation = await services.user.reservation.update(
    reservationToken,
    data
  )

  services.user.email.sendReservationPdfs(reservation)

  res.json("ok")
})

const pdf = catchAsync(async (req, res) => {
  const token = req.params.token
  const reservedTicketId = +req.params.reservedTicketId
  const passengerId = +req.params.passengerId

  const reservation = await services.user.reservation.getOne(token)

  if (!reservation) throw new ApiError(404, "Reservation not found")

  const passenger = reservation.passengers.find(p => p.id === passengerId)

  if (!passenger) throw new ApiError(404, "Passenger not found")

  const reservedTicket = passenger.reservedTickets.find(
    r => r.id === reservedTicketId
  )

  if (!reservedTicket) throw new ApiError(404, "Reserved Ticket not found")

  const reservedTrip = reservation.reservedTrips.find(
    p => p.id === reservedTicket.reservedTripId
  )

  if (!reservedTrip) throw new ApiError(404, "Reserved Trip not found")

  services.user.reservationPdf.generate({
    reservation,
    res,
    reservedTicket,
    passenger,
    reservedTrip,
  })
})

export const reservation = {
  create,
  addReservedTrip,
  deleteReservedTrip,
  deleteOne,
  getInSnipcartFormat,
  snipcartWebhooks,
  updatePassengers,
  pdf,
  getMany,
  getOne,
}
