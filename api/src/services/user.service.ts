const httpStatus = require("http-status")
const { User } = require("../models")
import { ApiError } from "../utils"

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const create = async userBody => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken")
  }
  return User.create(userBody)
}

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const query = async (filter, options) => {
  const users = await User.paginate(filter, options)
  return users
}

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getById = async id => {
  return User.findById(id)
}

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getByEmail = async email => {
  return User.findOne({ email })
}

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateById = async (userId, updateBody) => {
  const user = await getUserById(userId)
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

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteById = async userId => {
  const user = await getUserById(userId)
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
