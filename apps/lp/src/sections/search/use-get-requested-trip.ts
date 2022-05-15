import { useState, useEffect, useMemo } from "react"
import { getUrlParams } from "@bus/shared"

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

export const useGetRequestedTrip = () => {
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

  return useMemo(() => ({ requestedTrip }), [requestedTrip])
}
