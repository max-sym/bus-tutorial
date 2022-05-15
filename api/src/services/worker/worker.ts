import bcrypt from "bcryptjs"
import { prisma } from "../../config"
import httpStatus from "http-status"
import { ApiError } from "../../utils"
import { Prisma } from "@prisma/client"

const create = async (workerBody: Prisma.WorkerCreateInput) => {
  const isEmailTaken = await prisma.worker.findUnique({
    where: { email: workerBody.email },
  })
  if (isEmailTaken)
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken")

  const password = bcrypt.hashSync(workerBody.password)

  return await prisma.worker.create({ data: { ...workerBody, password } })
}

// const query = async (filter: object, options: any) => {
//   const workers = await Worker.paginate(filter, options)
//   return workers
// }

const getById = async (id: number) => {
  return await prisma.worker.findUnique({ where: { id } })
}

const getByEmail = async (email: string) => {
  return await prisma.worker.findUnique({ where: { email } })
}

const updateById = async (
  workerId: number,
  updateBody: Prisma.WorkerUpdateInput
) => {
  const worker = await getById(workerId)
  if (!worker) throw new ApiError(httpStatus.NOT_FOUND, "Worker not found")

  if (
    updateBody.email &&
    (await prisma.worker.findFirst({
      // @ts-ignore
      where: { email: updateBody.email, NOT: { id: workerId } },
    }))
  )
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken")

  return await prisma.worker.update({
    where: { id: workerId },
    data: updateBody,
  })
}

const changePassword = async (
  workerId: number,
  updateBody: Prisma.WorkerUpdateInput
) => {
  return await prisma.worker.update({
    where: { id: workerId },
    data: {
      password: bcrypt.hashSync(updateBody.password),
    },
  })
}

const deleteById = async (workerId: number) => {
  return await prisma.worker.delete({ where: { id: workerId } })
}

export const worker = {
  create,
  // query,
  getById,
  getByEmail,
  updateById,
  deleteById,
  changePassword,
}
