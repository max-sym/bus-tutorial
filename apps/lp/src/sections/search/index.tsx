import React from "react"
import { Section } from "components"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { ReservationBar } from "./reservation-bar"
import { Trips } from "./trips"
import { data, useLoadResource } from "data"
import { useGetRequestedTrip } from "./use-get-requested-trip"

export const SearchSection = () => {
  const { requestedTrip } = useGetRequestedTrip()

  const loadTrips = async () => {
    if (
      !requestedTrip ||
      !requestedTrip.cityFromSlug ||
      !requestedTrip.cityToSlug ||
      !requestedTrip.departureDate
    )
      return null

    const trips = await data.trip.getMany({
      from: requestedTrip.cityFromSlug,
      to: requestedTrip.cityToSlug,
      departureDate: requestedTrip.departureDate,
    })

    return trips
  }

  const { resource, isLoading } = useLoadResource(loadTrips, [requestedTrip])

  if (!requestedTrip || !resource || isLoading) return null

  return (
    <Section className="mt-20">
      <div className="flex justify-between gap-x-4">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1">
          <Header requestedTrip={requestedTrip} />
          <Trips trips={resource} />
        </div>
        <div className="w-1/4">
          <ReservationBar />
        </div>
      </div>
    </Section>
  )
}
