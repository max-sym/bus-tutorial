import httpStatus from "http-status"
import { catchAsync, trimSensitiveData } from "../../utils"
import { services } from "../../services"

const register = catchAsync(async (req, res) => {
  const { confirmPassword, ...workerBody } = req.body
  const worker = await services.worker.worker.create(workerBody)

  const verifyEmailToken = await services.worker.token.generateVerifyEmailToken(
    worker
  )

  services.worker.email.sendVerificationEmail({
    to: { email: worker.email, name: worker.name },
    token: verifyEmailToken,
  })

  res.status(httpStatus.NO_CONTENT).send()
})

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body
  const worker = await services.worker.auth.loginWorkerWithEmailAndPassword(
    email,
    password
  )
  const tokens = await services.worker.token.generateAuthTokens(worker)
  res.send({ worker: trimSensitiveData(worker, "password"), tokens })
})

const logout = catchAsync(async (req, res) => {
  await services.worker.auth.logout(req.body.refreshToken)
  res.status(httpStatus.NO_CONTENT).send()
})

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await services.worker.auth.refreshAuth(req.body.refreshToken)
  res.send({ ...tokens })
})

const requestPasswordReset = catchAsync(async (req, res) => {
  const { resetPasswordToken, worker } =
    await services.worker.token.generateResetPasswordToken(req.body.email)
  await services.worker.email.sendResetPasswordEmail(worker, resetPasswordToken)
  res.status(httpStatus.NO_CONTENT).send()
})

const resetPassword = catchAsync(async (req, res) => {
  await services.worker.auth.resetPassword(req.body.token, req.body.password)
  res.status(httpStatus.NO_CONTENT).send()
})

const sendVerificationEmail = catchAsync(async (req, res) => {
  // const verifyEmailToken = await services.worker.token.generateVerifyEmailToken(req.worker)
  // await services.worker.email.sendVerificationEmail(req.worker.email, verifyEmailToken)
  res.status(httpStatus.NO_CONTENT).send()
})

const verifyEmail = catchAsync(async (req, res) => {
  await services.worker.auth.verifyEmail(req.query.token as string)
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
