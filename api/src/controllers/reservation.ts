import { catchAsync, pick } from "../utils"
import { reservationService } from "../services"

const create = catchAsync(async (req, res) => {
  const result = await reservationService.create()

  res.send(result)
})

export const reservationController = {
  create,
}
