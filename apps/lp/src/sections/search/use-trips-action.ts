import React, { useMemo } from "react"
import { ReservationType, TripType, useStore } from "store"
import { data } from "data"
import { useGetRequestedTrip } from "./use-get-requested-trip"

export const useTripsAction = ({ trip }: { trip: TripType }) => {
  const reservation = useStore(store => store.reservation)
  const setReservation = useStore(store => store.setReservation)

  const { requestedTrip } = useGetRequestedTrip()

  const isReserved =
    !!reservation?.reservedTrips.length &&
    !!reservation.reservedTrips.find(
      reservedTrip => reservedTrip.trip.id === trip.id
    )

  const addReservedTrip = async (
    reservation: ReservationType,
    trip: TripType
  ) => {
    await data.reservation
      .addReservedTrip(reservation, trip)
      .then(setReservation)
  }

  const onAddClick = async () => {
    if (!requestedTrip) return

    if (reservation) {
      addReservedTrip(reservation, trip)
      return
    }

    const newReservation = await data.reservation.create(requestedTrip)

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
