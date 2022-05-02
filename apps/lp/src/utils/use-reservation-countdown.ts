import React, { useEffect } from "react"
import { useStore } from "store"
import { useInterval } from "usehooks-ts"
import moment from "moment"

export const useReservationCountdown = () => {
  const reservation = useStore(store => store.reservation)
  const setReservation = useStore(store => store.setReservation)
  const reservationTimeLeft = useStore(store => store.reservationTimeLeft)

  const getTimeLeft = () => {
    if (!reservation) return

    const expiresAt = moment(reservation.expiresAt)
    const difference = moment.duration(expiresAt.diff(moment()))

    return Math.max(0, difference.asMilliseconds())
  }

  useEffect(() => {
    if (reservationTimeLeft === null || reservationTimeLeft > 0) return

    setReservation(null)
  }, [reservationTimeLeft])

  useEffect(() => {
    if (reservation) return

    useStore.setState({ reservationTimeLeft: null })
  }, [reservation])

  useInterval(
    () => {
      useStore.setState({ reservationTimeLeft: getTimeLeft() })
    },
    reservation ? 1000 : null
  )
}
