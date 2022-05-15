import { catchAsync } from "../../utils"
import { services } from "../../services"

const getMany = catchAsync(async (req, res) => {
  const result = await services.user.city.getMany(req.query.query as string)
  res.send(result)
})

const getSome = catchAsync(async (req, res) => {
  const result = await services.user.city.getSome(req.query.cities as string)
  res.send(result)
})

export const city = {
  getMany,
  getSome,
}
