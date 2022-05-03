import { ApiError, catchAsync, pick } from "../utils"
import { reservationService } from "../services"
import { Request } from "express"
import Prisma from "@prisma/client"

const create = catchAsync(async (req, res) => {
  const result = await reservationService.create()

  res.send(result)
})

const addReservedTrip = catchAsync(async (req, res) => {
  const token = req.params.token
  const result = await reservationService.addReservedTrip(token, req.body)

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

  await reservationService.update(reservationToken, data)

  res.json("ok")
})

export const reservationController = {
  create,
  addReservedTrip,
  deleteReservedTrip,
  deleteOne,
  getInSnipcartFormat,
  snipcartWebhooks,
}
