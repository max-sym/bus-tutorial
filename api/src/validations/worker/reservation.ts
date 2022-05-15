import Joi from "joi"

const getForChecker = {
  params: Joi.object().keys({
    token: Joi.string().required(),
    passengerId: Joi.number().required(),
    reservedTicketId: Joi.number().required(),
  }),
}

export const reservation = {
  getForChecker,
}
