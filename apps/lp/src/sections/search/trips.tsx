import { Text, Card, CardContent, Button } from "components"
import React from "react"
import moment from "moment"
import { data } from "data"
import { getPrice } from "utils"
import { ReservationType, TripType, useStore } from "store"

const ActionButton = ({ trip }: { trip: TripType }) => {
  const reservation = useStore(store => store.reservation)
  const isReserved =
    !!reservation?.reservedTrips.length &&
    !!reservation.reservedTrips.find(
      reservedTrip => reservedTrip.trip.id === trip.id
    )

  const addReservedTrip = async (
    reservation: ReservationType,
    trip: TripType
  ) => {
    await data.reservation.addReservedTrip(reservation, trip).then(data => {
      useStore.setState({ reservation: data })
    })
  }

  const onClick = async () => {
    if (reservation) {
      addReservedTrip(reservation, trip)
      return
    }

    const newReservation = await data.reservation.create()

    addReservedTrip(newReservation, trip)
  }

  return <Button onClick={onClick}>{isReserved ? "Remove" : "Add"}</Button>
}

const Actions = ({
  trip,
  priceText,
}: {
  trip: TripType
  priceText: string
}) => {
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
        <ActionButton trip={trip} />
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
            <div>{!!trip.distance && <Text>{`${trip.distance}km`}</Text>}</div>
          </div>
        </div>
        <Actions trip={trip} priceText={priceText} />
      </CardContent>
    </Card>
  )
}

export const Trips = ({ trips }: { trips: TripType[] }) => (
  <div className="space-y-4 mt-14">
    {trips.map(trip => (
      <TripItem key={trip.id} trip={trip} />
    ))}
  </div>
)
