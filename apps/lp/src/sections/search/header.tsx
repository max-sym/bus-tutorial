import React from "react"
import { Text } from "components"
import moment from "moment"

const GuestsIndicator = () => {
  const adults = 2
  const children = 0
  const infants = 1

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

export const Header = () => {
  const location = `New York - Los Angeles`
  const date = new Date()
  const formattedDate = moment(date).format("LL")

  return (
    <div className="text-center">
      <Text variant="h5">{"Search"}</Text>
      <div className="mt-4">
        <Text variant="button">{location}</Text>
        <Text>{formattedDate}</Text>
        <GuestsIndicator />
      </div>
    </div>
  )
}
