import React, { useEffect, useState, useMemo, useCallback } from "react"
import { TripType } from "store"
import produce from "immer"

type FilterItemType = {
  name: string
  value: boolean
}

type FilterItemsListSection = {
  /**
   * Name of the filtering section. For example, "Bus Type".
   */
  name: string
  /**
   * Function that determines if a certain trip is valid under this filter.
   */
  filteringFunction: (trip: TripType, items: FilterItemType[]) => boolean
  /**
   * Function that determines if the filter should be turned on based on user selection in the filter section items.
   */
  turnOnFunction: (items: FilterItemType[]) => boolean
  /**
   * Filter section parameters
   */
  items: FilterItemType[]
}

type FilterItemsListType = {
  [key: string]: FilterItemsListSection | null
}

export const useFilterTrips = ({ trips }: { trips?: TripType[] }) => {
  const [filterBy, setFilterBy] = useState<FilterItemsListType>({ bus: null })

  useEffect(() => {
    if (!trips) return

    const busItems = trips
      .filter(
        (trip, index, self) =>
          index === self.findIndex(selfTrip => selfTrip.bus.id === trip.bus.id)
      )
      .map(trip => ({ value: false, name: trip.bus.name }))

    setFilterBy({
      bus: {
        name: "Bus Type",
        turnOnFunction: items => items.some(i => i.value),
        filteringFunction: (trip, items) =>
          items.some(item => trip.bus.name === item.name && item.value),
        items: busItems,
      },
    })
  }, [trips])

  const filteredTrips = useMemo(() => {
    return trips?.filter(trip => {
      return Object.keys(filterBy).some(key => {
        const filterSection = filterBy[key]
        if (
          !filterSection ||
          !filterSection.turnOnFunction(filterSection.items)
        )
          return true

        return filterSection.filteringFunction(trip, filterSection.items)
      })
    })
  }, [trips, filterBy])

  const toggleFilterItem = useCallback(
    (sectionName: string, item: FilterItemType) => {
      const nextState = produce(filterBy, (draftState: FilterItemsListType) => {
        const section = draftState[sectionName]
        if (!section?.items) return

        const itemIndex = section.items.findIndex(i => i.name === item.name)
        const currentItem = section.items[itemIndex]

        currentItem.value = !currentItem.value
      })

      setFilterBy(nextState)
    },
    [filterBy]
  )

  return useMemo(
    () => ({ filteredTrips, filterBy, setFilterBy, toggleFilterItem }),
    [filteredTrips, filterBy, setFilterBy, toggleFilterItem]
  )
}
