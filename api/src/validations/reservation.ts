import Joi from "joi"

const addReservedTrip = {
  params: Joi.object().keys({
    token: Joi.string().required(),
  }),
}

export const reservationValidation = {
  addReservedTrip,
}
