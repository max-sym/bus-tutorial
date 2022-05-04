import React from "react"
import { useStore } from "store"
import { CardNotRounded, CardContent, Text, Button } from "components"
import { getFormattedTimeLeft } from "utils"

export const MobileReservationBar = () => {
  const reservation = useStore(store => store.reservation)
  const reservationTimeLeft = useStore(store => store.reservationTimeLeft)

  const isOpen = !!reservation

  if (!isOpen || !reservationTimeLeft) return null

  return (
    <div className="fixed bottom-0 left-0 right-0">
      <CardNotRounded>
        <CardContent className="flex items-center justify-between">
          <div>
            <Text className="font-bold">{"Reservation"}</Text>
            <Text>{reservation.reservedTrips.length + " trips added"}</Text>
            <Text color="red">
              {getFormattedTimeLeft(reservationTimeLeft) + " left"}
            </Text>
          </div>
          <Button>{"Proceed"}</Button>
        </CardContent>
      </CardNotRounded>
    </div>
  )
}
