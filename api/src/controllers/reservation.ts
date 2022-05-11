import { ApiError, catchAsync } from "../utils"
import { reservationPdf, reservationService } from "../services"
import { Request, Response } from "express"
import Prisma from "@prisma/client"
import { emailService } from "../services/email"

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await reservationService.create(req.body)

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

  emailService.reservationPdf({
    to: {
      email: body.content.user.email,
      name: body.content.user.billingAddressName,
    },
    reservationToken,
  })

  res.json("ok")
})

const pdf = catchAsync(async (req: Request, res: Response) => {
  const token = req.params.token
  const reservation = await reservationService.getOne(token)

  if (!reservation) throw new ApiError(404, "Reservation not found")

  reservationPdf.generate({ reservation, res })
})

export const reservationController = {
  create,
  addReservedTrip,
  deleteReservedTrip,
  deleteOne,
  getInSnipcartFormat,
  snipcartWebhooks,
  pdf,
}
