import React, { useEffect, useState } from "react"
import { Section } from "components"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { ReservationBar } from "./reservation-bar"
import { Trips } from "./trips"

export type RequestedTripType = {
  cityFromSlug?: string
  cityToSlug?: string
  departureDate?: string
  guests: {
    adults: number
    children: number
    infants: number
  }
}

const getUrlParams = () => {
  return new URLSearchParams(window.location.search)
}

export const SearchSection = () => {
  const [requestedTrip, setRequestedTrip] = useState<RequestedTripType | null>(
    null
  )

  const params = getUrlParams()

  useEffect(() => {
    if (!params) return

    setRequestedTrip({
      cityFromSlug: params.get("from") || undefined,
      cityToSlug: params.get("to") || undefined,
      departureDate: params.get("departureDate") || undefined,
      guests: {
        adults: +(params.get("guests-adults") || 0),
        children: +(params.get("guests-children") || 0),
        infants: +(params.get("guests-infants") || 0),
      },
    })
  }, [])

  if (!requestedTrip) return null

  return (
    <Section className="mt-20">
      <div className="flex justify-between gap-x-4">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1">
          <Header requestedTrip={requestedTrip} />
          <Trips />
        </div>
        <div className="w-1/4">
          <ReservationBar />
        </div>
      </div>
    </Section>
  )
}
