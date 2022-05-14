import React from "react"
import {
  Card,
  Text,
  CardHeading,
  CardContent,
  SectionAndOffset,
  Button,
  Loading,
} from "components"
import { data, useLoadResource } from "data"
import moment from "moment"
import { ReservationType, ReservedTripType, PassengerType } from "store"
import { getTotalPrice, getPrice, getTotalPriceWithDiscount } from "utils"
import { Link } from "gatsby"

const ReservedTrip = ({ reservedTrip }: { reservedTrip: ReservedTripType }) => {
  const trip = reservedTrip.trip

  const departure = moment(trip.departure)

  const priceText = "€" + getPrice(trip.price)

  const departureDayText = departure.format("LL")
  const departureTimeText = departure.format("hh:mm")

  const arrivalTimeText = moment(trip.arrival).format("hh:mm")

  return (
    <Card>
      <CardHeading>
        <Text variant="h6">{`Trip ${reservedTrip.id}`}</Text>
      </CardHeading>
      <CardContent>
        <Text>{departureDayText}</Text>
        <div className="flex gap-x-2">
          <Text className="font-bold">{departureTimeText}</Text>
          <Text>{trip.cityFrom.name}</Text>
        </div>
        <div className="flex gap-x-2">
          <Text className="font-bold">{arrivalTimeText}</Text>
          <Text>{trip.cityTo.name}</Text>
        </div>
        <Text>{trip.bus.name}</Text>
        <Text variant="button">{priceText}</Text>
      </CardContent>
    </Card>
  )
}

const Passenger = ({ passenger }: { passenger: PassengerType }) => (
  <Card>
    <CardHeading>
      <Text variant="h6">{`Passenger ${passenger.id}`}</Text>
    </CardHeading>
    <CardContent>
      <Text>{passenger.email}</Text>
      <Text>{passenger.name}</Text>
      <Text>{passenger.citizenId}</Text>
    </CardContent>
  </Card>
)

const Reservation = ({ reservation }: { reservation: ReservationType }) => {
  return (
    <>
      <Card>
        <CardHeading>
          <Text variant="h5">{`Reservation ${reservation.token}`}</Text>
        </CardHeading>
        <CardContent>
          <Text>ID: {reservation.token}</Text>
          <Text>State: {reservation.state}</Text>
          <Text>
            <span>{"Total Price: "}</span>
            <s>€{getTotalPrice(reservation)}</s>
          </Text>
          <Text>
            <span>{"Total Price: "}</span>
            <span>€{getTotalPriceWithDiscount(reservation)}</span>
          </Text>
        </CardContent>
      </Card>
      <div className="flex gap-4 mt-4">
        {reservation.reservedTrips.map(reservedTrip => (
          <ReservedTrip key={reservedTrip.id} reservedTrip={reservedTrip} />
        ))}
      </div>
      <div className="flex gap-4 mt-4">
        {reservation.passengers.map(passenger => (
          <Passenger key={passenger.id} passenger={passenger} />
        ))}
      </div>
    </>
  )
}

export const ReservationSection = ({ token }: { token: string }) => {
  const { resource, isLoading } = useLoadResource(async () => {
    const result = await data.reservation.getOne(token)
    return result
  })

  if (!resource) return null

  return (
    <SectionAndOffset>
      {isLoading ? <Loading /> : <Reservation reservation={resource} />}
    </SectionAndOffset>
  )
}
