import { catchAsync } from "../utils"
import { cityService } from "../services"

const getMany = catchAsync(async (req, res) => {
  const result = await cityService.getMany(req.query.query)
  res.send(result)
})

const getSome = catchAsync(async (req, res) => {
  const result = await cityService.getSome(req.query.cities)
  res.send(result)
})

export const cityController = {
  getMany,
  getSome,
}
