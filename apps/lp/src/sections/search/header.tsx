import React, { useEffect, useState } from "react"
import { Text } from "components"
import moment from "moment"
import { RequestedTripType } from "."
import { data } from "data"

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

  const [cities, setCities] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const loadCities = async () => {
    if (!requestedTrip.cityFromSlug || !requestedTrip.cityToSlug) return null

    setIsLoading(true)

    const cities = await data.city.getSome([
      requestedTrip.cityFromSlug,
      requestedTrip.cityToSlug,
    ])

    setIsLoading(false)

    const from = cities.find(city => city.slug === requestedTrip.cityFromSlug)
    const to = cities.find(city => city.slug === requestedTrip.cityToSlug)

    setCities({ from, to })
  }

  useEffect(() => {
    loadCities()
  }, [])

  if (!cities || isLoading) return null

  const location = `${cities.from?.name} - ${cities.to?.name}`

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
