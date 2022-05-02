import { catchAsync, pick } from "../utils"
import { reservationService } from "../services"
import { Request } from "express"

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

export const reservationController = {
  create,
  addReservedTrip,
  deleteReservedTrip,
}
