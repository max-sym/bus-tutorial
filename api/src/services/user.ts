import httpStatus from "http-status"
import { ApiError } from "../utils"

const create = async (userBody: object): Promise<User> => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken")
  }
  return User.create(userBody)
}

const query = async (filter: object, options: any) => {
  const users = await User.paginate(filter, options)
  return users
}

const getById = async (id: number): Promise<User> => {
  return User.findById(id)
}

const getByEmail = async (email: string): Promise<User> => {
  return User.findOne({ email })
}

const updateById = async (
  userId: number,
  updateBody: object
): Promise<User> => {
  const user = await getById(userId)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found")
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken")
  }
  Object.assign(user, updateBody)
  await user.save()
  return user
}

const deleteById = async (userId: number): Promise<User> => {
  const user = await getById(userId)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found")
  }
  await user.remove()
  return user
}

export const userService = {
  create,
  query,
  getById,
  getByEmail,
  updateById,
  deleteById,
}
