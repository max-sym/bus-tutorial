import { Card, CardContent, SectionAndOffset, Text } from "components"
import React from "react"
import tw from "tailwind-styled-components"
import { RiBuilding2Fill } from "@react-icons/all-files/ri/RiBuilding2Fill"
import { RiVipFill } from "@react-icons/all-files/ri/RiVipFill"
import { BsPersonCheckFill } from "@react-icons/all-files/bs/BsPersonCheckFill"

const CardContainer = tw.div`flex justify-center gap-4 mt-14`

const stats = [
  {
    title: "Passengers Served",
    quantity: 10_503_334,
    icon: BsPersonCheckFill,
    color: "text-blue-500",
  },
  {
    title: "Stations around the U.S.",
    quantity: 1325,
    icon: RiVipFill,
    color: "text-green-500",
  },
  {
    title: "VIP served",
    quantity: 3209,
    icon: RiBuilding2Fill,
    color: "text-blue-500",
  },
]

const StatItem = ({ item }) => (
  <Card>
    <CardContent className="flex flex-col justify-center items-center">
      <item.icon className={`w-8 h-8 ${item.color}`} />
      <Text variant="h4" className={item.color}>
        {item.quantity}
      </Text>
      <Text variant="bodyBig" className="mt-2 px-8">
        {item.title}
      </Text>
    </CardContent>
  </Card>
)

export const StatsSection = () => {
  return (
    <SectionAndOffset>
      <Text variant="h4" className="text-center uppercase">
        {"Numbers Say It All"}
      </Text>
      <CardContainer>
        {stats.map(item => (
          <StatItem key={item.title} item={item} />
        ))}
      </CardContainer>
    </SectionAndOffset>
  )
}
