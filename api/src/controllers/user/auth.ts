import httpStatus from "http-status"
import { catchAsync, trimSensitiveData } from "../../utils"
import { services } from "../../services"

const register = catchAsync(async (req, res) => {
  const { confirmPassword, ...userBody } = req.body
  const user = await services.user.user.create(userBody)

  const verifyEmailToken = await services.user.token.generateVerifyEmailToken(
    user
  )

  services.user.email.sendVerificationEmail({
    to: { email: user.email, name: user.name },
    token: verifyEmailToken,
  })

  res.status(httpStatus.NO_CONTENT).send()
})

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body
  const user = await services.user.auth.loginUserWithEmailAndPassword(
    email,
    password
  )
  const tokens = await services.user.token.generateAuthTokens(user)
  res.send({ user: trimSensitiveData(user, "password"), tokens })
})

const logout = catchAsync(async (req, res) => {
  await services.user.auth.logout(req.body.refreshToken)
  res.status(httpStatus.NO_CONTENT).send()
})

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await services.user.auth.refreshAuth(req.body.refreshToken)
  res.send({ ...tokens })
})

const requestPasswordReset = catchAsync(async (req, res) => {
  const { resetPasswordToken, user } =
    await services.user.token.generateResetPasswordToken(req.body.email)
  await services.user.email.sendResetPasswordEmail(user, resetPasswordToken)
  res.status(httpStatus.NO_CONTENT).send()
})

const resetPassword = catchAsync(async (req, res) => {
  await services.user.auth.resetPassword(req.body.token, req.body.password)
  res.status(httpStatus.NO_CONTENT).send()
})

const sendVerificationEmail = catchAsync(async (req, res) => {
  // const verifyEmailToken = await services.user.token.generateVerifyEmailToken(req.user)
  // await services.user.email.sendVerificationEmail(req.user.email, verifyEmailToken)
  res.status(httpStatus.NO_CONTENT).send()
})

const verifyEmail = catchAsync(async (req, res) => {
  await services.user.auth.verifyEmail(req.query.token as string)
  res.status(httpStatus.NO_CONTENT).send()
})

export const auth = {
  register,
  login,
  logout,
  refreshTokens,
  requestPasswordReset,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
}
