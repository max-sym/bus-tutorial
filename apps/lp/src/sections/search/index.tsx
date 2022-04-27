import {
  Section,
  Text,
  Card,
  CardHeading,
  CardTitle,
  CardContent,
  Button,
  Check,
} from "components"
import React from "react"
import moment from "moment"
import { trips, TripType } from "./data"
import { getPrice } from "utils"

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

const Header = () => {
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

const ActionButton = () => <Button>{"Add"}</Button>

const Actions = ({ priceText }: { priceText: string }) => {
  return (
    <div className="flex flex-col items-end justify-end gap-2">
      <div className="flex flex-col items-stretch justify-between flex-1">
        <div className="flex gap-x-4">
          <Text variant="subtitle" color="green">
            {"12 seats left"}
          </Text>
          <Text variant="button" className="font-bold text-right">
            {priceText}
          </Text>
        </div>
        <ActionButton />
      </div>
    </div>
  )
}

const TripItem = ({ trip }: { trip: TripType }) => {
  const priceText = "$" + getPrice(trip.price)

  return (
    <Card>
      <CardContent className="flex justify-between gap-2 gap-x-4">
        <div className="flex justify-between flex-1">
          <div className="flex-1">
            <Text variant="button">
              {moment(trip.departure).format("hh:mm DD/MM")}
            </Text>
            <Text>{trip.cityFrom.name}</Text>
            <div>
              <Text>{trip.bus.name}</Text>
            </div>
          </div>
          <div className="text-right">
            <Text variant="button">
              {moment(trip.arrival).format("hh:mm DD/MM")}
            </Text>
            <Text>{trip.cityTo.name}</Text>
            <div>
              <Text>{`${trip.distance}km`}</Text>
            </div>
          </div>
        </div>
        <Actions priceText={priceText} />
      </CardContent>
    </Card>
  )
}

const Trips = () => (
  <div className="space-y-4 mt-14">
    {trips.map(trip => (
      <TripItem key={trip.id} trip={trip} />
    ))}
  </div>
)

const FilterItem = ({ item, sectionKey }) => (
  <Check
    id={`filter-item-${sectionKey}-${item.name}`}
    label={item.name}
    checked={item.value}
  />
)

const FilterSection = ({ section, sectionKey }) => (
  <div>
    <Text variant="body">{section.name}</Text>
    <div className="mt-2 space-y-1">
      {section.items.map(item => (
        <FilterItem key={item.name} item={item} sectionKey={sectionKey} />
      ))}
    </div>
  </div>
)

const section = {
  name: "Bus",
  items: [
    {
      name: "Standard Bus",
      value: false,
    },
    {
      name: "VIP Bus",
      value: true,
    },
  ],
}

const Sidebar = () => (
  <Card className="sticky top-32">
    <CardHeading>
      <CardTitle>{"Filter by"}</CardTitle>
    </CardHeading>
    <CardContent>
      <div className="space-y-2">
        <FilterSection sectionKey="bus" section={section} />
      </div>
    </CardContent>
  </Card>
)

export const SearchSection = () => {
  return (
    <Section className="mt-20">
      <div className="flex justify-between gap-x-4">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1">
          <Header />
          <Trips />
        </div>
        <div className="w-1/4">{/* reservation bar */}</div>
      </div>
    </Section>
  )
}
