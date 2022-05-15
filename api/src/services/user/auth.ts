import bcrypt from "bcryptjs"
import httpStatus from "http-status"
import { token as tokenService } from "./token"
import { user as userService } from "./user"
import { ApiError, isPasswordMatch } from "../../utils"
import { prisma, logger } from "../../config"

const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const user = await userService.getByEmail(email)
  if (!user)
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password")

  if (!user.isEmailVerified)
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Please verify your email first"
    )

  if (!(await isPasswordMatch(password, user.password)))
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password")

  return user
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
    const user = await userService.getById(refreshTokenDoc.userId)
    if (!user) throw new ApiError(404, "User not found")

    await prisma.token.delete({ where: { id: refreshTokenDoc.id } })
    return tokenService.generateAuthTokens(user)
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
    const user = await userService.getById(resetPasswordTokenDoc.userId)
    if (!user) throw new ApiError(404, "User not found")

    await userService.updateById(user.id, {
      password: bcrypt.hashSync(newPassword),
    })
    await prisma.token.deleteMany({
      where: { userId: user.id, type: "RESET_PASSWORD" },
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
    const user = await userService.getById(verifyEmailTokenDoc.userId)
    if (!user) throw new Error()

    await prisma.token.deleteMany({
      where: { userId: user.id, type: "VERIFY_EMAIL" },
    })
    return await userService.updateById(user.id, { isEmailVerified: true })
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Email verification failed")
  }
}

export const auth = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
}
