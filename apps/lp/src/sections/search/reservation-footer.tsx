import React, { useState } from "react"
import { Button, Text } from "components"
import { ReservationType, useStore } from "store"
import { getFormattedTimeLeft, getTotalPrice } from "utils"
import { data } from "data"
import { Link } from "gatsby"

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

const clearCart = async () => {
  await Promise.all(
    window.Snipcart.store.getState().cart.items.items.map(async item => {
      if (!item?.id) return true

      return await window.Snipcart.api.cart.items.remove(item.uniqueId)
    })
  )
}

export const ConfirmButton = () => (
  <Link to="/confirmation">
    <Button>{"Confirm"}</Button>
  </Link>
)

export const CheckoutButton = ({
  reservation,
  isButtonDisabled,
}: {
  reservation: ReservationType
  isButtonDisabled: boolean
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    setIsLoading(true)
    await clearCart()
    await window.Snipcart.api.cart.update({
      metadata: { reservationToken: reservation.token },
    })
    const items = await data.reservation.getInSnipcartFormat(reservation)

    if (!items.length) return

    try {
      await window.Snipcart.api.cart.items.add(...items).then(() => {
        window.Snipcart.api.theme.cart.open()
      })
    } catch (error) {
      console.log(error)
    }

    setIsLoading(false)
  }

  return (
    <Button isLoading={isLoading} onClick={onClick} disabled={isButtonDisabled}>
      {"Checkout"}
    </Button>
  )
}

export const ReservationFooter = ({
  reservation,
  isCheckout,
  isButtonDisabled,
}: {
  reservation: ReservationType
  isCheckout: boolean
  isButtonDisabled: boolean
}) => {
  return (
    <div>
      <TotalPrice reservation={reservation} />
      <TimeLeftText />
      <div className="flex flex-col mt-4">
        {isCheckout ? (
          <CheckoutButton
            isButtonDisabled={isButtonDisabled}
            reservation={reservation}
          />
        ) : (
          <ConfirmButton />
        )}
      </div>
    </div>
  )
}
