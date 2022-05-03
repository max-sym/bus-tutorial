import React from "react"
import { Button, Text } from "components"
import { ReservationType, useStore } from "store"
import { getFormattedTimeLeft, getTotalPrice, getPrice } from "utils"

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

const ConfirmButton = ({ reservation }: { reservation: ReservationType }) => {
  const onClick = async () => {
    const items = reservation.reservedTrips.map(item => ({
      id: item.id,
      name: "Trip",
      price: getPrice(item.trip.price),
      url: "/",
      quantity: 1,
      maxQuantity: 1,
      minQuantity: 1,
      description: "Trip from A to B",
    }))

    try {
      await window.Snipcart.api.cart.items.add(...items).then(() => {
        window.Snipcart.api.theme.cart.open()
      })
    } catch (error) {
      console.log(error)
    }
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
        <ConfirmButton reservation={reservation} />
      </div>
    </div>
  )
}
