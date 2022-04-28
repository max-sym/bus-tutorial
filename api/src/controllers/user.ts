import httpStatus from "http-status"
import { catchAsync, ApiError, pick } from "../utils"
import { userService } from "../services"

const createUser = catchAsync(async (req, res) => {
  const user = await userService.create(req.body)
  res.status(httpStatus.CREATED).send(user)
})

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"])
  const options = pick(req.query, ["sortBy", "limit", "page"])
  const result = await userService.query(filter, options)
  res.send(result)
})

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getById(req.params.userId)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found")
  }
  res.send(user)
})

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateById(req.params.userId, req.body)
  res.send(user)
})

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteById(req.params.userId)
  res.status(httpStatus.NO_CONTENT).send()
})

export const userController = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
}
