import { catchAsync } from "../utils"
import { cityService } from "../services"

const getMany = catchAsync(async (req, res) => {
  const result = await cityService.getMany(req.query.query)
  res.send(result)
})

export const cityController = {
  getMany,
}
