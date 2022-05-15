import Joi from "joi"

const create = {
  body: Joi.object().keys({
    guests: Joi.object()
      .keys({
        adults: Joi.number(),
        children: Joi.number(),
        infants: Joi.number(),
      })
      .required(),
  }),
}

const updatePassengers = {
  params: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    passengers: Joi.array().items(
      Joi.object().keys({
        id: Joi.number().required(),
        name: Joi.string().required(),
        email: Joi.string().required(),
        citizenId: Joi.string().required(),
      })
    ),
  }),
}

const addReservedTrip = {
  params: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    tripId: Joi.number().required(),
  }),
}

const pdf = {
  params: Joi.object().keys({
    token: Joi.string().required(),
    passengerId: Joi.number().required(),
    reservedTicketId: Joi.number().required(),
  }),
}

const deleteReservedTrip = {
  params: Joi.object().keys({
    token: Joi.string().required(),
    reservedTripId: Joi.number().required(),
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

const getOne = {
  params: Joi.object().keys({
    token: Joi.string().required(),
  }),
}

export const reservation = {
  create,
  addReservedTrip,
  deleteReservedTrip,
  deleteOne,
  getInSnipcartFormat,
  updatePassengers,
  pdf,
  getOne,
}
