import { catchAsync } from "../../utils"
import { services } from "../../services"

const confirm = catchAsync(async (req, res) => {
  const result = await services.worker.reservedTicket.confirm(+req.params.id)

  res.send(result)
})

export const reservedTicket = {
  confirm,
}
