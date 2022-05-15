import Joi from "joi"
import { custom } from "./custom"

const register = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(custom.password),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    acceptedPrivacy: Joi.boolean().required(),
  }),
}

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
}

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
}

const requestPasswordReset = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
}

const resetPassword = {
  body: Joi.object().keys({
    token: Joi.string().required(),
    password: Joi.string().required().custom(custom.password),
  }),
}

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
}

export const auth = {
  register,
  login,
  logout,
  refreshTokens,
  requestPasswordReset,
  resetPassword,
  verifyEmail,
}
