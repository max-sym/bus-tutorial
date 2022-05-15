import Joi from "joi"
import { custom } from "./custom"

const update = {
  body: Joi.object().keys({ name: Joi.string().required() }).min(1),
}

const changePassword = {
  body: Joi.object().keys({
    password: Joi.string().required().custom(custom.password),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  }),
}

export const user = {
  update,
  changePassword,
}
