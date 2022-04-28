import Joi from "joi"

const getMany = {
  query: Joi.object().keys({
    query: Joi.string(),
  }),
}

export const cityValidation = {
  getMany,
}
