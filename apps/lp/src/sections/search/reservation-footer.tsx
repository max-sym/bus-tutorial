import React from "react"
import { Button, Text } from "components"
import { ReservationType } from "store"
import { getTotalPrice } from "utils"

const TimeLeftText = () => {
  const reservationTimeLeft = 1000

  return (
    <Text className="text-right" color="red">
      <span>{"Time left to confirm your order: "}</span>
      <span>{reservationTimeLeft}</span>
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
