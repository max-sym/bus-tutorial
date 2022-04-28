import { Text, Card, CardContent, Button } from "components"
import React from "react"
import moment from "moment"
import { trips, TripType } from "./data"
import { getPrice } from "utils"

const ActionButton = () => <Button>{"Add"}</Button>

const Actions = ({ priceText }: { priceText: string }) => {
  return (
    <div className="flex flex-col items-end justify-end gap-2">
      <div className="flex flex-col items-stretch justify-between flex-1">
        <div className="flex gap-x-4">
          <Text variant="subtitle" color="green">
            {"12 seats left"}
          </Text>
          <Text variant="button" className="font-bold text-right">
            {priceText}
          </Text>
        </div>
        <ActionButton />
      </div>
    </div>
  )
}

const TripItem = ({ trip }: { trip: TripType }) => {
  const priceText = "$" + getPrice(trip.price)

  return (
    <Card>
      <CardContent className="flex justify-between gap-2 gap-x-4">
        <div className="flex justify-between flex-1">
          <div className="flex-1">
            <Text variant="button">
              {moment(trip.departure).format("hh:mm DD/MM")}
            </Text>
            <Text>{trip.cityFrom.name}</Text>
            <div>
              <Text>{trip.bus.name}</Text>
            </div>
          </div>
          <div className="text-right">
            <Text variant="button">
              {moment(trip.arrival).format("hh:mm DD/MM")}
            </Text>
            <Text>{trip.cityTo.name}</Text>
            <div>
              <Text>{`${trip.distance}km`}</Text>
            </div>
          </div>
        </div>
        <Actions priceText={priceText} />
      </CardContent>
    </Card>
  )
}
export const Trips = () => (
  <div className="space-y-4 mt-14">
    {trips.map(trip => (
      <TripItem key={trip.id} trip={trip} />
    ))}
  </div>
)
