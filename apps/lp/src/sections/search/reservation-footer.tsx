import React from "react"
import { Button, Text } from "components"
import { ReservationType, useStore } from "store"
import { getFormattedTimeLeft, getTotalPrice } from "utils"

const TimeLeftText = () => {
  const reservationTimeLeft = useStore(store => store.reservationTimeLeft)

  if (!reservationTimeLeft) return null

  return (
    <Text className="text-right" color="red">
      <span>{"Time left to confirm your order: "}</span>
      <span>{getFormattedTimeLeft(reservationTimeLeft)}</span>
    </Text>
  )
}

const TotalPrice = ({ reservation }: { reservation: ReservationType }) => (
  <div className="text-right">
    <Text>{`Total: $${getTotalPrice(reservation)}`}</Text>
  </div>
)

const ConfirmButton = () => {
  const onClick = () => {
    // confirm order
  }

  return <Button onClick={onClick}>{"Confirm"}</Button>
}

export const ReservationFooter = ({
  reservation,
}: {
  reservation: ReservationType
}) => {
  return (
    <div>
      <TotalPrice reservation={reservation} />
      <TimeLeftText />
      <div className="flex flex-col mt-4">
        <ConfirmButton />
      </div>
    </div>
  )
}
