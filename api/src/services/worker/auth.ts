import bcrypt from "bcryptjs"
import httpStatus from "http-status"
import { token as tokenService } from "./token"
import { worker as workerService } from "./worker"
import { ApiError, isPasswordMatch } from "../../utils"
import { prisma, logger } from "../../config"

const loginWorkerWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const worker = await workerService.getByEmail(email)
  if (!worker)
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password")

  if (!worker.isEmailVerified)
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Please verify your email first"
    )

  if (!(await isPasswordMatch(password, worker.password)))
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password")

  return worker
}

const logout = async (refreshToken: string) => {
  return await prisma.token.deleteMany({
    where: {
      token: refreshToken,
      type: "REFRESH",
      blacklisted: false,
    },
  })
}

const refreshAuth = async (refreshToken: string) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      "REFRESH"
    )
    const worker = await workerService.getById(refreshTokenDoc.workerId)
    if (!worker) throw new ApiError(404, "Worker not found")

    await prisma.token.delete({ where: { id: refreshTokenDoc.id } })
    return tokenService.generateAuthTokens(worker)
  } catch (error) {
    logger.info(error)
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
  }
}

const resetPassword = async (
  resetPasswordToken: string,
  newPassword: string
) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(
      resetPasswordToken,
      "RESET_PASSWORD"
    )
    const worker = await workerService.getById(resetPasswordTokenDoc.workerId)
    if (!worker) throw new ApiError(404, "Worker not found")

    await workerService.updateById(worker.id, {
      password: bcrypt.hashSync(newPassword),
    })
    await prisma.token.deleteMany({
      where: { workerId: worker.id, type: "RESET_PASSWORD" },
    })
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password reset failed")
  }
}

const verifyEmail = async (verifyEmailToken: string) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(
      verifyEmailToken,
      "VERIFY_EMAIL"
    )
    const worker = await workerService.getById(verifyEmailTokenDoc.workerId)
    if (!worker) throw new Error()

    await prisma.token.deleteMany({
      where: { workerId: worker.id, type: "VERIFY_EMAIL" },
    })
    return await workerService.updateById(worker.id, { isEmailVerified: true })
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Email verification failed")
  }
}

export const auth = {
  loginWorkerWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
}
