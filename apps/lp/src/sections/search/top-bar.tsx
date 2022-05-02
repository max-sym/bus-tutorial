import React, { useState } from "react"
import { Text, Select } from "components"

const options = [
  { name: "Price Asc", value: "a" },
  { name: "Time Desc", value: "b" },
]

export const TopBar = ({ trips }) => {
  const count = trips.length

  const [value, setValue] = useState("b")

  const onChange = option => {
    setValue(option.value)
  }

  return (
    <div className="flex justify-between">
      <Text>{`${count} results found`}</Text>
      <div>
        <div className="flex items-center gap-2">
          <Text>{"Sort by:"}</Text>
          <Select options={options} value={value} onChange={onChange} />
        </div>
      </div>
    </div>
  )
}
