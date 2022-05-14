import React from "react"
import { Text, Button } from "@bus/ui"
import { ReservationType, ReservedTripType } from "store"
import moment from "moment"
import { getPrice } from "utils"
import { RiCloseFill } from "@react-icons/all-files/ri/RiCloseFill"
import { useTripsAction } from "./use-trips-action"

const ReservedTrip = ({ reservedTrip }: { reservedTrip: ReservedTripType }) => {
  const trip = reservedTrip.trip

  const departure = moment(trip.departure)

  const priceText = "€" + getPrice(trip.price)

  const departureDayText = departure.format("LL")
  const departureTimeText = departure.format("hh:mm")

  const arrivalTimeText = moment(trip.arrival).format("hh:mm")

  const { onRemoveClick } = useTripsAction({ trip })

  return (
    <div className="flex justify-between">
      <div>
        <Text>{departureDayText}</Text>
        <div className="flex gap-x-2">
          <Text className="font-bold">{departureTimeText}</Text>
          <Text>{trip.cityFrom.name}</Text>
        </div>
        <div className="flex gap-x-2">
          <Text className="font-bold">{arrivalTimeText}</Text>
          <Text>{trip.cityTo.name}</Text>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <Button variant="round" color="red" onClick={onRemoveClick}>
          <RiCloseFill className="w-full h-full" />
        </Button>
        <Text className="mt-2 font-bold">{priceText}</Text>
      </div>
    </div>
  )
}

export const ReservationContent = ({
  reservation,
}: {
  reservation: ReservationType
}) => {
  return (
    <div className="space-y-4">
      {reservation.reservedTrips.map(reservedTrip => (
        <div key={reservedTrip.id}>
          <ReservedTrip reservedTrip={reservedTrip} />
        </div>
      ))}
    </div>
  )
}
