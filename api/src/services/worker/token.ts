import jwt from "jsonwebtoken"
import moment, { Moment } from "moment"
import httpStatus from "http-status"
import { env, prisma } from "../../config"
import { worker as workerService } from "./worker"
import { ApiError } from "../../utils"
import Prisma from "@prisma/client"

const generateToken = (
  workerId: number,
  expires: Moment,
  type: string,
  secret: string = env.jwt.secret
): string => {
  const payload = {
    sub: workerId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  }
  return jwt.sign(payload, secret)
}

const saveToken = async (
  token: string,
  workerId: number,
  expires: Moment,
  type: Prisma.TokenType,
  blacklisted: boolean = false
) => {
  const tokenDoc = await prisma.token.create({
    data: {
      token,
      worker: { connect: { id: workerId } },
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
    where: { token, type, workerId: payload.sub, blacklisted: false },
  })
  if (!tokenDoc) throw new Error("Token not found")

  return tokenDoc
}

const generateAuthTokens = async (worker: Prisma.Worker) => {
  const accessTokenExpires = moment().add(
    env.jwt.accessExpirationMinutes,
    "minutes"
  )
  const accessToken = generateToken(worker.id, accessTokenExpires, "ACCESS")

  const refreshTokenExpires = moment().add(
    env.jwt.refreshExpirationDays,
    "days"
  )
  const refreshToken = generateToken(worker.id, refreshTokenExpires, "REFRESH")
  await saveToken(refreshToken, worker.id, refreshTokenExpires, "REFRESH")

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
  const worker = await workerService.getByEmail(email)
  if (!worker)
    throw new ApiError(httpStatus.NOT_FOUND, "No workers found with this email")

  const expires = moment().add(
    env.jwt.resetPasswordExpirationMinutes,
    "minutes"
  )
  const resetPasswordToken = generateToken(worker.id, expires, "RESET_PASSWORD")
  await saveToken(resetPasswordToken, worker.id, expires, "RESET_PASSWORD")
  return { resetPasswordToken, worker }
}

const generateVerifyEmailToken = async (worker: Prisma.Worker) => {
  const expires = moment().add(env.jwt.verifyEmailExpirationMinutes, "minutes")
  const verifyEmailToken = generateToken(worker.id, expires, "VERIFY_EMAIL")
  await saveToken(verifyEmailToken, worker.id, expires, "VERIFY_EMAIL")
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
