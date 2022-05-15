import httpStatus from "http-status"
import { catchAsync, trimSensitiveData } from "../../utils"
import { services } from "../../services"

const update = catchAsync(async (req, res) => {
  const user = await services.user.user.updateById(req.user.id, req.body)
  res.send(trimSensitiveData(user, "password"))
})

const changePassword = catchAsync(async (req, res) => {
  await services.user.user.changePassword(req.user.id, req.body)
  res.status(httpStatus.NO_CONTENT).send()
})

const deleteAccount = catchAsync(async (req, res) => {
  await services.user.user.deleteById(req.user.id)
  res.status(httpStatus.NO_CONTENT).send()
})

export const user = {
  // createUser,
  // getUsers,
  // getUser,
  update,
  deleteAccount,
  changePassword,
}
