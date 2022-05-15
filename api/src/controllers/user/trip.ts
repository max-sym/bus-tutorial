import { catchAsync, pick } from "../../utils"
import { services } from "../../services"

const getMany = catchAsync(async (req, res) => {
  const result = await services.user.trip.getMany(
    pick(req.query, ["from", "to", "departureDate"])
  )

  res.send(result)
})

export const trip = {
  getMany,
}
