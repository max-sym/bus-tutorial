import Joi from "joi"

const getOne = {
  params: Joi.object().keys({
    token: Joi.string().required(),
  }),
}

export const reservation = {
  getOne,
}
