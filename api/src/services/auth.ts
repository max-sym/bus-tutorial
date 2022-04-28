const httpStatus = require("http-status")
import { tokenService } from "./token"
import { userService } from "./user"
// import Token from "../models/token.model"
import { ApiError } from "../utils"
import { tokenTypes } from "../config"

const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<User> => {
  const user = await userService.getByEmail(email)
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password")
  }
  return user
}

const logout = async (refreshToken: string): Promise<any> => {
  const refreshTokenDoc = await Token.findOne({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  })
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found")
  }
  await refreshTokenDoc.remove()
}

const refreshAuth = async (refreshToken: string): Promise<object> => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      tokenTypes.REFRESH
    )
    const user = await userService.getById(refreshTokenDoc.user)
    if (!user) {
      throw new Error()
    }
    await refreshTokenDoc.remove()
    return tokenService.generateAuthTokens(user)
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
  }
}

const resetPassword = async (
  resetPasswordToken: string,
  newPassword: string
): Promise<any> => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(
      resetPasswordToken,
      tokenTypes.RESET_PASSWORD
    )
    const user = await userService.getById(resetPasswordTokenDoc.user)
    if (!user) {
      throw new Error()
    }
    await userService.updateById(user.id, { password: newPassword })
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD })
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password reset failed")
  }
}

const verifyEmail = async (verifyEmailToken: string): Promise<any> => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(
      verifyEmailToken,
      tokenTypes.VERIFY_EMAIL
    )
    const user = await userService.getById(verifyEmailTokenDoc.user)
    if (!user) {
      throw new Error()
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL })
    await userService.updateById(user.id, { isEmailVerified: true })
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Email verification failed")
  }
}

export const authService = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
}
