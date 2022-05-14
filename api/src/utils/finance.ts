// import { ReservationType } from "store"

export const getPrice = (priceInCents: number) =>
  (priceInCents / 100).toFixed(2)

export const getTotalPrice = reservation =>
  reservation.reservedTrips
    .reduce((acc, trip) => acc + +getPrice(trip.trip.price), 0)
    .toFixed(2)
