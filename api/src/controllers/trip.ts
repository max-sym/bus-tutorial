import { catchAsync, pick } from "../utils"
import { tripService } from "../services"

const getMany = catchAsync(async (req, res) => {
  const result = await tripService.getMany(
    pick(req.query, ["from", "to", "departureDate"])
  )

  res.send(result)
})

export const tripController = {
  getMany,
}
