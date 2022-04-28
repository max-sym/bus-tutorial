import React from "react"
import { Text } from "components"
import moment from "moment"
import { RequestedTripType } from "."

const GuestsIndicator = ({
  requestedTrip,
}: {
  requestedTrip: RequestedTripType
}) => {
  const { adults, children, infants } = requestedTrip.guests

  const text = [
    adults + " Adults",
    children + " Children",
    infants + " Infants",
  ]
    .filter(i => +i[0])
    .join(" | ")

  return (
    <div className="mt-4">
      <Text>{text}</Text>
    </div>
  )
}

export const Header = ({
  requestedTrip,
}: {
  requestedTrip: RequestedTripType
}) => {
  const location = `${requestedTrip.cityFromSlug} - ${requestedTrip.cityToSlug}`
  const formattedDate = moment(
    requestedTrip.departureDate,
    "DD-MM-YYYY"
  ).format("LL")

  return (
    <div className="text-center">
      <Text variant="h5">{"Search"}</Text>
      <div className="mt-4">
        <Text variant="button">{location}</Text>
        <Text>{formattedDate}</Text>
        <GuestsIndicator requestedTrip={requestedTrip} />
      </div>
    </div>
  )
}
