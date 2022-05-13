import httpStatus from "http-status"
import { catchAsync, trimSensitiveData } from "../utils"
import {
  authService,
  userService,
  tokenService,
  emailService,
} from "../services"
import { Request, Response } from "express"

const register = catchAsync(async (req: Request, res: Response) => {
  const { confirmPassword, ...userBody } = req.body
  const user = await userService.create(userBody)

  const verifyEmailToken = await tokenService.generateVerifyEmailToken(user)

  emailService.sendVerificationEmail({
    to: { email: user.email, name: user.name },
    token: verifyEmailToken,
  })

  res.status(httpStatus.NO_CONTENT).send()
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

const requestPasswordReset = catchAsync(async (req: Request, res: Response) => {
  const { resetPasswordToken, user } =
    await tokenService.generateResetPasswordToken(req.body.email)
  await emailService.sendResetPasswordEmail(user, resetPasswordToken)
  res.status(httpStatus.NO_CONTENT).send()
})

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  await authService.resetPassword(req.body.token, req.body.password)
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
  requestPasswordReset,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
}
