import React from "react"
import {
  Card,
  CardHeading,
  CardTitle,
  CardContent,
  Check,
  Text,
} from "components"

const FilterItem = ({ item, sectionKey, toggleFilterItem }) => {
  const onChange = () => {
    toggleFilterItem(sectionKey, item)
  }

  return (
    <Check
      id={`filter-item-${sectionKey}-${item.name}`}
      label={item.name}
      checked={item.value}
      onChange={onChange}
    />
  )
}

export const FilterSection = ({ toggleFilterItem, section, sectionKey }) => {
  if (!section) return null

  return (
    <div>
      <Text variant="body">{section.name}</Text>
      <div className="mt-2 space-y-1">
        {section.items.map(item => (
          <FilterItem
            key={item.name}
            item={item}
            toggleFilterItem={toggleFilterItem}
            sectionKey={sectionKey}
          />
        ))}
      </div>
    </div>
  )
}

export const Sidebar = ({ filterBy, toggleFilterItem }) => (
  <Card className="sticky top-32">
    <CardHeading>
      <CardTitle>{"Filter by"}</CardTitle>
    </CardHeading>
    <CardContent>
      <div className="space-y-2">
        {Object.keys(filterBy).map(sectionKey => (
          <FilterSection
            key={sectionKey}
            sectionKey={sectionKey}
            toggleFilterItem={toggleFilterItem}
            section={filterBy[sectionKey]}
          />
        ))}
      </div>
    </CardContent>
  </Card>
)
