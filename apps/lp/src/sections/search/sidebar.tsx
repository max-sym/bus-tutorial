import React from "react"
import {
  Card,
  CardHeading,
  CardTitle,
  CardContent,
  Check,
  Text,
} from "components"

const FilterItem = ({ item, sectionKey }) => {
  const onChange = () => {}

  return (
    <Check
      id={`filter-item-${sectionKey}-${item.name}`}
      label={item.name}
      checked={item.value}
      onChange={onChange}
    />
  )
}

export const FilterSection = ({ section, sectionKey }) => (
  <div>
    <Text variant="body">{section.name}</Text>
    <div className="mt-2 space-y-1">
      {section.items.map(item => (
        <FilterItem key={item.name} item={item} sectionKey={sectionKey} />
      ))}
    </div>
  </div>
)

export const section = {
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

export const Sidebar = () => (
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
