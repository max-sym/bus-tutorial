import { catchAsync, pick } from "../utils"
import { reservationService } from "../services"

const create = catchAsync(async (req, res) => {
  const result = await reservationService.create()

  res.send(result)
})

const addReservedTrip = catchAsync(async (req, res) => {
  const token = req.params.token
  const result = await reservationService.addReservedTrip(token, req.body)

  res.send(result)
})

export const reservationController = {
  create,
  addReservedTrip,
}
