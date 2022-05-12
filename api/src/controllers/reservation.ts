import { ApiError, catchAsync } from "../utils"
import { reservationPdf, reservationService } from "../services"
import { Request, Response } from "express"
import Prisma from "@prisma/client"
import { emailService } from "../services"

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await reservationService.create(req.body)

  res.send(result)
})

const addReservedTrip = catchAsync(async (req, res) => {
  const token = req.params.token
  const result = await reservationService.addReservedTrip(token, req.body)

  res.send(result)
})

const updatePassengers = catchAsync(async (req: Request, res: Response) => {
  const token = req.params.token
  const result = await reservationService.updatePassengers(
    token,
    req.body.passengers
  )

  res.send(result)
})

const deleteReservedTrip = catchAsync(async (req: Request, res) => {
  const token = req.params.token
  const reservedTripId = +req.params.reservedTripId
  const result = await reservationService.deleteReservedTrip(
    token,
    reservedTripId
  )

  res.send(result)
})

const deleteOne = catchAsync(async (req: Request, res) => {
  const token = req.params.token
  const result = await reservationService.deleteOne(token)

  res.send(result)
})

const getInSnipcartFormat = catchAsync(async (req: Request, res) => {
  const token = req.params.token
  const result = await reservationService.getInSnipcartFormat(token)

  res.json(result)
})

const snipcartWebhooks = catchAsync(async (req: Request, res) => {
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

  const reservation = await reservationService.update(reservationToken, data)

  emailService.sendReservationPdfs(reservation)

  res.json("ok")
})

const pdf = catchAsync(async (req: Request, res: Response) => {
  const token = req.params.token
  const reservedTicketId = +req.params.reservedTicketId
  const passengerId = +req.params.passengerId

  const reservation = await reservationService.getOne(token)

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

  reservationPdf.generate({
    reservation,
    res,
    reservedTicket,
    passenger,
    reservedTrip,
  })
})

export const reservationController = {
  create,
  addReservedTrip,
  deleteReservedTrip,
  deleteOne,
  getInSnipcartFormat,
  snipcartWebhooks,
  updatePassengers,
  pdf,
}
