import React, { useEffect } from "react"
import { useStore } from "store"
import { useInterval } from "usehooks-ts"
import moment from "moment"

export const useReservationCountdown = () => {
  const reservation = useStore(store => store.reservation)

  const getTimeLeft = () => {
    if (!reservation) return

    const expiresAt = moment(reservation.expiresAt)
    const difference = moment.duration(expiresAt.diff(moment()))

    return Math.max(0, difference.asMilliseconds())
  }

  useEffect(() => {
    // cleanup reservation
  }, [])

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
