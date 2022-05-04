import React from "react"
import { Section } from "components"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { ReservationBar } from "./reservation-bar"
import { Trips } from "./trips"
import { data, useLoadResource } from "data"
import { useGetRequestedTrip } from "./use-get-requested-trip"
import { useSortTrips } from "./use-sort-trips"
import { TopBar } from "./top-bar"
import { useFilterTrips } from "./use-filter-trips"

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

  const { filteredTrips, filterBy, toggleFilterItem } = useFilterTrips({
    trips: resource,
  })

  const { sortedTrips, sortBy, setSortBy } = useSortTrips({
    trips: filteredTrips,
  })

  if (!requestedTrip || !resource || isLoading) return null

  return (
    <Section className="mt-20">
      <div className="flex justify-between gap-x-4">
        <div className="hidden w-1/4 md:block">
          <Sidebar filterBy={filterBy} toggleFilterItem={toggleFilterItem} />
        </div>
        <div className="flex flex-col flex-1">
          <Header requestedTrip={requestedTrip} />
          <TopBar trips={sortedTrips} sortBy={sortBy} setSortBy={setSortBy} />
          <Trips trips={sortedTrips} />
        </div>
        <div className="hidden w-1/4 md:block">
          <ReservationBar />
        </div>
      </div>
    </Section>
  )
}
