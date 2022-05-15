import { catchAsync } from "../../utils"
import { services } from "../../services"

const getOne = catchAsync(async (req, res) => {
  const result = await services.user.reservation.getOne(req.params.token)

  res.send(result)
})

export const reservation = {
  getOne,
}
