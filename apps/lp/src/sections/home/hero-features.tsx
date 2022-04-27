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

const HeroFeatureItem = ({ item, inView, index }) => (
  <div
    className={`transition duration-[1200ms] ${
      inView ? "" : "translate-x-3 opacity-0"
    }`}
    style={{
      transitionDelay: 200 * index + 1800 + "ms",
    }}
  >
    <Text variant="body" className="font-bold">
      {item.title}
    </Text>
    <Text color="gray-light">{item.description}</Text>
  </div>
)

export const HeroFeatures = ({ inView }) => (
  <div className="flex gap-4">
    {heroFeatures.map((item, index) => (
      <HeroFeatureItem
        index={index}
        inView={inView}
        key={item.title}
        item={item}
      />
    ))}
  </div>
)
