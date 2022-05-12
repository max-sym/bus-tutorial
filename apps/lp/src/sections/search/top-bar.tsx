import React from "react"
import { Text, Select } from "components"
import { options } from "./use-sort-trips"

export const TopBar = ({ trips, sortBy, setSortBy }) => {
  const count = trips.length

  const onChange = option => {
    setSortBy(option.value)
  }

  return (
    <div className="flex items-center justify-between mt-8">
      <Text>{`${count} results found`}</Text>
      <div>
        <div className="flex items-center gap-2">
          <Text>{"Sort by:"}</Text>
          <Select options={options} value={sortBy} onChange={onChange} />
        </div>
      </div>
    </div>
  )
}
