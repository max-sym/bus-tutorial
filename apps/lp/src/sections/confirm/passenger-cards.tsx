import React from "react"
import { Card, Button, CardContent, Label, Text, InputCore } from "components"
import { PassengerType, useStore } from "store"

const PassengerCard = ({ passenger }: { passenger: PassengerType }) => (
  <Card>
    <CardContent>
      <Text>{passenger.id}</Text>
      <div className="flex justify-between gap-2">
        <div>
          <Label>{"Name"}</Label>
          <InputCore
            placeholder="John Doe"
            value={passenger.name}
            onChange={() => {}}
          />
        </div>
        <div>
          <Label>{"Email"}</Label>
          <InputCore
            placeholder="john@example.com"
            value={passenger.email}
            onChange={() => {}}
          />
        </div>
        <div>
          <Label>{"Citizen ID"}</Label>
          <InputCore
            placeholder="XXXXXX"
            value={passenger.citizenId}
            onChange={() => {}}
          />
        </div>
      </div>
    </CardContent>
  </Card>
)

export const PassengerCards = () => {
  const reservation = useStore(store => store.reservation)

  if (!reservation?.passengers) return null

  return (
    <>
      <div className="mt-4 space-y-4">
        {reservation.passengers.map(passenger => (
          <PassengerCard key={passenger.id} passenger={passenger} />
        ))}
      </div>
      <div className="mt-4">
        <Button>{"Save"}</Button>
      </div>
    </>
  )
}
