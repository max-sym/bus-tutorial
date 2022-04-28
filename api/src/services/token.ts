import jwt from "jsonwebtoken"
import moment from "moment"
import httpStatus from "http-status"
import { env, tokenTypes } from "../config"
import { userService } from "./user"
import { ApiError } from "../utils"

const generateToken = (
  userId: ObjectId,
  expires: Moment,
  type: string,
  secret: string = env.jwt.secret
): string => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  }
  return jwt.sign(payload, secret)
}

const saveToken = async (
  token: string,
  userId: ObjectId,
  expires: Moment,
  type: string,
  blacklisted: boolean = false
): Promise<Token> => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  })
  return tokenDoc
}

const verifyToken = async (token: string, type: string): Promise<Token> => {
  const payload = jwt.verify(token, env.jwt.secret)
  const tokenDoc = await Token.findOne({
    token,
    type,
    user: payload.sub,
    blacklisted: false,
  })
  if (!tokenDoc) {
    throw new Error("Token not found")
  }
  return tokenDoc
}

const generateAuthTokens = async (user: User): Promise<object> => {
  const accessTokenExpires = moment().add(
    env.jwt.accessExpirationMinutes,
    "minutes"
  )
  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    tokenTypes.ACCESS
  )

  const refreshTokenExpires = moment().add(
    env.jwt.refreshExpirationDays,
    "days"
  )
  const refreshToken = generateToken(
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  )
  await saveToken(
    refreshToken,
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  )

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  }
}

const generateResetPasswordToken = async (email: string): Promise<string> => {
  const user = await userService.getUserByEmail(email)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "No users found with this email")
  }
  const expires = moment().add(
    env.jwt.resetPasswordExpirationMinutes,
    "minutes"
  )
  const resetPasswordToken = generateToken(
    user.id,
    expires,
    tokenTypes.RESET_PASSWORD
  )
  await saveToken(
    resetPasswordToken,
    user.id,
    expires,
    tokenTypes.RESET_PASSWORD
  )
  return resetPasswordToken
}

const generateVerifyEmailToken = async (user: User): Promise<string> => {
  const expires = moment().add(env.jwt.verifyEmailExpirationMinutes, "minutes")
  const verifyEmailToken = generateToken(
    user.id,
    expires,
    tokenTypes.VERIFY_EMAIL
  )
  await saveToken(verifyEmailToken, user.id, expires, tokenTypes.VERIFY_EMAIL)
  return verifyEmailToken
}

export const tokenService = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken,
  generateVerifyEmailToken,
}
