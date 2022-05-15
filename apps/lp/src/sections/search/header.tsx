import React from "react"
import { Text } from "@bus/ui"
import moment from "moment"
import { RequestedTripType } from "./use-get-requested-trip"
import { data, useLoadResource } from "data"

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
  const formattedDate = moment(
    requestedTrip.departureDate,
    "DD-MM-YYYY"
  ).format("LL")

  const loadCities = async () => {
    if (!requestedTrip.cityFromSlug || !requestedTrip.cityToSlug) return null

    const cities = await data.city.getSome([
      requestedTrip.cityFromSlug,
      requestedTrip.cityToSlug,
    ])

    const from = cities.find(city => city.slug === requestedTrip.cityFromSlug)
    const to = cities.find(city => city.slug === requestedTrip.cityToSlug)

    return { from, to }
  }

  const { resource, isLoading } = useLoadResource(loadCities)

  if (!resource || isLoading) return null

  const location = `${resource.from?.name} - ${resource.to?.name}`

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
