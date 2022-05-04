import { Card, CardContent, SectionAndOffset, Text } from "components"
import React from "react"
import tw from "tailwind-styled-components"
import { RiBuilding2Fill } from "@react-icons/all-files/ri/RiBuilding2Fill"
import { RiVipFill } from "@react-icons/all-files/ri/RiVipFill"
import { BsPersonCheckFill } from "@react-icons/all-files/bs/BsPersonCheckFill"
import { InView } from "react-cool-inview"
import CountUp from "react-countup"

const CardsContainer = tw.div`flex justify-center gap-4 mt-14 md:flex-row flex-col`

const stats = [
  {
    title: "Passengers Served",
    value: 10_503_334,
    icon: BsPersonCheckFill,
    color: "text-blue-500",
  },
  {
    title: "Stations around the U.S.",
    value: 1_325,
    icon: RiVipFill,
    color: "text-green-500",
  },
  {
    title: "VIP served",
    value: 3_209,
    icon: RiBuilding2Fill,
    color: "text-blue-500",
  },
]

const StatItem = ({ item, inView }: any) => (
  <Card>
    <CardContent className="flex flex-col items-center justify-center">
      <item.icon className={`w-8 h-8 ${item.color}`} />
      <CountUp
        start={0}
        delay={8}
        duration={8}
        separator=","
        end={inView ? item.value : 0}
      >
        {({ countUpRef }) => (
          <Text variant="h4" className={item.color} ref={countUpRef} />
        )}
      </CountUp>
      <Text variant="bodyBig" className="px-8 mt-2">
        {item.title}
      </Text>
    </CardContent>
  </Card>
)

export const StatsSectionCore = ({ observe, inView }: any) => (
  <SectionAndOffset ref={observe}>
    <Text
      variant="h4"
      className={`text-center uppercase transition duration-1000 delay-150 ${
        inView ? "" : "opacity-0"
      }`}
    >
      {"Numbers Say It All"}
    </Text>
    <CardsContainer>
      {stats.map((item, index) => (
        <div
          key={item.title}
          className={`transition duration-1000 ${
            inView ? "" : "opacity-0 translate-y-8"
          }`}
          style={{
            transitionDelay: 300 + 150 * index + "ms",
          }}
        >
          <StatItem item={item} inView={inView} />
        </div>
      ))}
    </CardsContainer>
  </SectionAndOffset>
)

export const StatsSection = () => (
  <InView unobserveOnEnter>
    <StatsSectionCore />
  </InView>
)
