import Joi from "joi"

const getMany = {
  query: Joi.object().keys({
    query: Joi.string().required().min(1),
  }),
}

export const cityValidation = {
  getMany,
}
