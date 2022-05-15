import React from "react"
import { useStore } from "store"
import {
  CardNotRounded,
  CardContent,
  Text,
  Button,
  useModal,
  Modal,
} from "@bus/ui"
import { getFormattedTimeLeft } from "utils"
import { ReservationBar } from "./reservation-bar"

const MobileReservationModal = () => {
  return <ReservationBar />
}

export const MobileReservationBar = () => {
  const reservation = useStore(store => store.reservation)
  const reservationTimeLeft = useStore(store => store.reservationTimeLeft)

  const modal = useModal({ customComponent: <MobileReservationModal /> })

  const isOpen = !!reservation

  const onProceedClick = () => {
    modal.setIsOpen(true)
  }

  if (!isOpen || !reservationTimeLeft) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden">
      <CardNotRounded>
        <CardContent className="flex items-center justify-between">
          <div>
            <Text className="font-bold">{"Reservation"}</Text>
            <Text>{reservation.reservedTrips.length + " trips added"}</Text>
            <Text color="red">
              {getFormattedTimeLeft(reservationTimeLeft) + " left"}
            </Text>
          </div>
          <Button onClick={onProceedClick}>{"Proceed"}</Button>
        </CardContent>
      </CardNotRounded>
      <Modal modal={modal} />
    </div>
  )
}
