import React, { useMemo } from "react"
import { useStore } from "store"
import { ReservationType, TripType } from "@bus/shared"
import { data } from "data"
import { useGetRequestedTrip } from "./use-get-requested-trip"
import { toast } from "react-toastify"

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

    if (newReservation.status !== 200) {
      toast.error("Something went wrong! Try again.")
      return
    }

    addReservedTrip(newReservation.response, trip)
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
