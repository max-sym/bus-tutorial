import httpStatus from "http-status"
import { catchAsync, trimSensitiveData } from "../utils"
import { userService } from "../services"
import { Request } from "../types"
import { Response } from "express"

const update = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.updateById(req.user.id, req.body)
  res.send(trimSensitiveData(user, "password"))
})

const deleteOne = catchAsync(async (req: Request, res: Response) => {
  await userService.deleteById(+req.params.userId)
  res.status(httpStatus.NO_CONTENT).send()
})

export const userController = {
  // createUser,
  // getUsers,
  // getUser,
  update,
  deleteOne,
}
