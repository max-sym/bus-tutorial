import Joi from "joi"
import { customValidation } from "./custom"

const update = {
  body: Joi.object().keys({ name: Joi.string().required() }).min(1),
}

const changePassword = {
  body: Joi.object().keys({
    password: Joi.string().required().custom(customValidation.password),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  }),
}

export const userValidation = {
  update,
  changePassword,
}
