import httpStatus from "http-status"
import { catchAsync, ApiError, trimSensitiveData } from "../utils"
import { userService } from "../services"
import { Request, Response } from "express"

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { confirmPassword, ...userBody } = req.body
  const user = await userService.create(userBody)
  res.status(httpStatus.CREATED).send(user)
})

// const getUsers = catchAsync(async (req: Request, res: Response) => {
//   const filter = pick(req.query, ["name", "role"])
//   const options = pick(req.query, ["sortBy", "limit", "page"])
//   const result = await userService.query(filter, options)
//   res.send(result)
// })

const getUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.getById(+req.params.userId)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found")
  }
  res.send(trimSensitiveData(user, "password"))
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.updateById(+req.params.userId, req.body)
  res.send(trimSensitiveData(user, "password"))
})

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  await userService.deleteById(+req.params.userId)
  res.status(httpStatus.NO_CONTENT).send()
})

export const userController = {
  createUser,
  // getUsers,
  getUser,
  updateUser,
  deleteUser,
}
