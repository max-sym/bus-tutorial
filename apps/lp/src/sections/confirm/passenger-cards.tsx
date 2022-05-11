import React from "react"
import { Card, CardContent, Text } from "components"
import { PassengerType, useStore } from "store"

const PassengerCard = ({ passenger }: { passenger: PassengerType }) => (
  <Card>
    <CardContent>
      <Text>{passenger.id}</Text>
    </CardContent>
  </Card>
)

export const PassengerCards = () => {
  const reservation = useStore(store => store.reservation)

  if (!reservation?.passengers) return null

  return (
    <div className="mt-4 space-y-4">
      {reservation.passengers.map(passenger => (
        <PassengerCard key={passenger.id} passenger={passenger} />
      ))}
    </div>
  )
}
