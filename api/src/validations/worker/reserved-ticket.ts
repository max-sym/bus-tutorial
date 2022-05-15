import Joi from "joi"

const confirm = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
}

export const reservedTicket = {
  confirm,
}
