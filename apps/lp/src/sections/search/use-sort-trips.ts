import React, { useState, useMemo } from "react"
import { TripType } from "store"

export type SortOption = {
  name: string
  value: "priceAsc" | "timeAsc" | "priceDesc" | "timeDesc"
}

export const options: SortOption[] = [
  { name: "Price Asc", value: "priceAsc" },
  { name: "Price Desc", value: "priceDesc" },
  { name: "Time Asc", value: "timeAsc" },
  { name: "Time Desc", value: "timeDesc" },
]

type SortFunctionType = (a: TripType, b: TripType) => number

const sortFunctions: {
  [value in SortOption["value"]]: SortFunctionType
} = {
  priceAsc: (a, b) => a.price - b.price,
  priceDesc: (a, b) => b.price - a.price,
  timeAsc: (a, b) => +new Date(a.departure) - +new Date(b.departure),
  timeDesc: (a, b) => +new Date(b.departure) - +new Date(a.departure),
}

export const useSortTrips = ({ trips }: { trips?: TripType[] }) => {
  const [sortBy, setSortBy] = useState<SortOption["value"]>(options[0].value)

  const sortedTrips = useMemo(() => {
    if (!trips) return []

    const result = [...trips].sort(sortFunctions[sortBy])
    return result
  }, [trips, sortBy])

  return useMemo(
    () => ({
      sortedTrips,
      sortBy,
      setSortBy,
    }),
    [sortedTrips, sortBy, setSortBy]
  )
}
