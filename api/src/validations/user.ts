import Joi from "joi"

const update = {
  body: Joi.object().keys({ name: Joi.string().required() }).min(1),
}

export const userValidation = {
  update,
}
