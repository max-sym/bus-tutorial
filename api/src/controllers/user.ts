import httpStatus from "http-status"
import { catchAsync, trimSensitiveData } from "../utils"
import { userService } from "../services"
import { Request } from "../types"
import { Response } from "express"

const update = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.updateById(req.user.id, req.body)
  res.send(trimSensitiveData(user, "password"))
})

const changePassword = catchAsync(async (req: Request, res: Response) => {
  await userService.changePassword(req.user.id, req.body)
  res.status(httpStatus.NO_CONTENT).send()
})

const deleteAccount = catchAsync(async (req: Request, res: Response) => {
  await userService.deleteById(req.user.id)
  res.status(httpStatus.NO_CONTENT).send()
})

export const userController = {
  // createUser,
  // getUsers,
  // getUser,
  update,
  deleteAccount,
  changePassword,
}
