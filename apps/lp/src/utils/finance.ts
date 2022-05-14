import { ReservationType } from "store"

export const getPrice = (priceInCents: number) =>
  (priceInCents / 100).toFixed(2)

export const getTotalPrice = (reservation: ReservationType) => {
  const total = reservation.reservedTrips.reduce(
    (acc, trip) => acc + +getPrice(trip.trip.price),
    0
  )

  return total.toFixed(2)
}

export const getTotalPriceWithDiscount = (reservation: ReservationType) => {
  const discountMultiplier = 1 - (reservation.discount || 0) / 100
  const total =
    reservation.reservedTrips.reduce(
      (acc, trip) => acc + +getPrice(trip.trip.price),
      0
    ) * discountMultiplier

  return total.toFixed(2)
}
