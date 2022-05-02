import React, { useMemo } from "react"
import { ReservationType, TripType, useStore } from "store"
import { data } from "data"

export const useTripsAction = ({ trip }: { trip: TripType }) => {
  const reservation = useStore(store => store.reservation)

  const isReserved =
    !!reservation?.reservedTrips.length &&
    !!reservation.reservedTrips.find(
      reservedTrip => reservedTrip.trip.id === trip.id
    )

  const setReservation = data => useStore.setState({ reservation: data })

  const addReservedTrip = async (
    reservation: ReservationType,
    trip: TripType
  ) => {
    await data.reservation
      .addReservedTrip(reservation, trip)
      .then(setReservation)
  }

  const onAddClick = async () => {
    if (reservation) {
      addReservedTrip(reservation, trip)
      return
    }

    const newReservation = await data.reservation.create()

    addReservedTrip(newReservation, trip)
  }

  const onRemoveClick = async () => {
    if (!reservation) return

    const reservedTrip = reservation.reservedTrips.find(
      reservedTrip => trip.id === reservedTrip.tripId
    )

    if (!reservedTrip) return

    data.reservation
      .deleteReservedTrip(reservation, reservedTrip)
      .then(reservation => {
        if (!reservation?.reservedTrips?.length) {
          data.reservation.deleteOne(reservation).then(() => {
            setReservation(null)
          })
          return
        }
        setReservation(reservation)
      })
  }

  return useMemo(
    () => ({ onAddClick, isReserved, onRemoveClick }),
    [onAddClick, isReserved, onRemoveClick]
  )
}
