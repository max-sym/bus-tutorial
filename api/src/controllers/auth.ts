import httpStatus from "http-status"
import { catchAsync, trimSensitiveData } from "../utils"
import {
  authService,
  userService,
  tokenService,
  // emailService,
} from "../services"
import { Request, Response } from "express"

const register = catchAsync(async (req: Request, res: Response) => {
  const { confirmPassword, ...userBody } = req.body
  const user = await userService.create(userBody)
  const tokens = await tokenService.generateAuthTokens(user)
  res
    .status(httpStatus.CREATED)
    .send({ user: trimSensitiveData(user, "password"), tokens })
})

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await authService.loginUserWithEmailAndPassword(email, password)
  const tokens = await tokenService.generateAuthTokens(user)
  res.send({ user: trimSensitiveData(user, "password"), tokens })
})

const logout = catchAsync(async (req: Request, res: Response) => {
  await authService.logout(req.body.refreshToken)
  res.status(httpStatus.NO_CONTENT).send()
})

const refreshTokens = catchAsync(async (req: Request, res: Response) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken)
  res.send({ ...tokens })
})

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  // const resetPasswordToken = await tokenService.generateResetPasswordToken(
  //   req.body.email
  // )
  // await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken)
  res.status(httpStatus.NO_CONTENT).send()
})

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  await authService.resetPassword(req.query.token as string, req.body.password)
  res.status(httpStatus.NO_CONTENT).send()
})

const sendVerificationEmail = catchAsync(
  async (req: Request, res: Response) => {
    // const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user)
    // await emailService.sendVerificationEmail(req.user.email, verifyEmailToken)
    res.status(httpStatus.NO_CONTENT).send()
  }
)

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  await authService.verifyEmail(req.query.token as string)
  res.status(httpStatus.NO_CONTENT).send()
})

export const authController = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
}
