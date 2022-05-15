import bcrypt from "bcryptjs"
import { prisma } from "../../config"
import httpStatus from "http-status"
import { ApiError } from "../../utils"
import { Prisma } from "@prisma/client"

const create = async (userBody: Prisma.UserCreateInput) => {
  const isEmailTaken = await prisma.user.findUnique({
    where: { email: userBody.email },
  })
  if (isEmailTaken)
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken")

  const password = bcrypt.hashSync(userBody.password)

  return await prisma.user.create({ data: { ...userBody, password } })
}

// const query = async (filter: object, options: any) => {
//   const users = await User.paginate(filter, options)
//   return users
// }

const getById = async (id: number) => {
  return await prisma.user.findUnique({ where: { id } })
}

const getByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } })
}

const updateById = async (
  userId: number,
  updateBody: Prisma.UserUpdateInput
) => {
  const user = await getById(userId)
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found")

  if (
    updateBody.email &&
    (await prisma.user.findFirst({
      // @ts-ignore
      where: { email: updateBody.email, NOT: { id: userId } },
    }))
  )
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken")

  return await prisma.user.update({
    where: { id: userId },
    data: updateBody,
  })
}

const changePassword = async (
  userId: number,
  updateBody: Prisma.UserUpdateInput
) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      password: bcrypt.hashSync(updateBody.password),
    },
  })
}

const deleteById = async (userId: number) => {
  return await prisma.user.delete({ where: { id: userId } })
}

export const user = {
  create,
  // query,
  getById,
  getByEmail,
  updateById,
  deleteById,
  changePassword,
}
