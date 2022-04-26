import React from "react"
import { Text } from "components"

const heroFeatures = [
  {
    title: "Book Easy",
    description: "Tickets with QR Code",
  },
  {
    title: "Discounts",
    description: "For those who create an account",
  },
  {
    title: "30+",
    description: "Cities around the U.S.",
  },
]

const HeroFeatureItem = ({ item }) => (
  <div>
    <Text variant="body" className="font-bold">
      {item.title}
    </Text>
    <Text>{item.description}</Text>
  </div>
)

export const HeroFeatures = () => (
  <div className="flex gap-4">
    {heroFeatures.map(item => (
      <HeroFeatureItem key={item.title} item={item} />
    ))}
  </div>
)
