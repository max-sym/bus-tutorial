import jwt from "jsonwebtoken"
import moment, { Moment } from "moment"
import httpStatus from "http-status"
import { env, prisma } from "../../config"
import { user as userService } from "./user"
import { ApiError } from "../../utils"
import Prisma from "@prisma/client"

const generateToken = (
  userId: number,
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
  userId: number,
  expires: Moment,
  type: Prisma.TokenType,
  blacklisted: boolean = false
) => {
  const tokenDoc = await prisma.token.create({
    data: {
      token,
      user: { connect: { id: userId } },
      expires: expires.toDate(),
      type,
      blacklisted,
    },
  })
  return tokenDoc
}

const verifyToken = async (token: string, type: Prisma.TokenType) => {
  const payload = jwt.verify(token, env.jwt.secret)
  const tokenDoc = await prisma.token.findFirst({
    // @ts-ignore
    where: { token, type, userId: payload.sub, blacklisted: false },
  })
  if (!tokenDoc) throw new Error("Token not found")

  return tokenDoc
}

const generateAuthTokens = async (user: Prisma.User) => {
  const accessTokenExpires = moment().add(
    env.jwt.accessExpirationMinutes,
    "minutes"
  )
  const accessToken = generateToken(user.id, accessTokenExpires, "ACCESS")

  const refreshTokenExpires = moment().add(
    env.jwt.refreshExpirationDays,
    "days"
  )
  const refreshToken = generateToken(user.id, refreshTokenExpires, "REFRESH")
  await saveToken(refreshToken, user.id, refreshTokenExpires, "REFRESH")

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

const generateResetPasswordToken = async (email: string) => {
  const user = await userService.getByEmail(email)
  if (!user)
    throw new ApiError(httpStatus.NOT_FOUND, "No users found with this email")

  const expires = moment().add(
    env.jwt.resetPasswordExpirationMinutes,
    "minutes"
  )
  const resetPasswordToken = generateToken(user.id, expires, "RESET_PASSWORD")
  await saveToken(resetPasswordToken, user.id, expires, "RESET_PASSWORD")
  return { resetPasswordToken, user }
}

const generateVerifyEmailToken = async (user: Prisma.User) => {
  const expires = moment().add(env.jwt.verifyEmailExpirationMinutes, "minutes")
  const verifyEmailToken = generateToken(user.id, expires, "VERIFY_EMAIL")
  await saveToken(verifyEmailToken, user.id, expires, "VERIFY_EMAIL")
  return verifyEmailToken
}

export const token = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken,
  generateVerifyEmailToken,
}
