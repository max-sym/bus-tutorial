import Joi from "joi"

const getMany = {
  query: Joi.object().keys({
    query: Joi.string().required().min(1),
  }),
}

const getSome = {
  query: Joi.object().keys({
    cities: Joi.string().required().min(1),
  }),
}

export const cityValidation = {
  getMany,
  getSome,
}
