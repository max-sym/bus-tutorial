import Joi from "joi"

const addReservedTrip = {
  params: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    tripId: Joi.number().required(),
  }),
}

const deleteReservedTrip = {
  params: Joi.object().keys({
    token: Joi.string().required(),
    reservedTripId: Joi.string().required(),
  }),
}

const deleteOne = {
  params: Joi.object().keys({
    token: Joi.string().required(),
  }),
}

const getInSnipcartFormat = {
  params: Joi.object().keys({
    token: Joi.string().required(),
  }),
}

export const reservationValidation = {
  addReservedTrip,
  deleteReservedTrip,
  deleteOne,
  getInSnipcartFormat,
}
