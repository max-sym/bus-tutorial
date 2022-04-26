import { Card, CardContent, SectionAndOffset, Text } from "components"
import React, { useState, useRef } from "react"
import tw from "tailwind-styled-components"
import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown"

const CardContainer = tw.div`space-y-4 mt-14`

type FaqItemType = {
  title: string
  description: string
}

const faqItems: FaqItemType[] = [
  {
    title: "How do I book tickets?",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque dolore ipsum mollitia incidunt voluptas hic sed aspernatur provident, facilis, assumenda odit commodi nam repellat et eius officiis laborum. Cum, deleniti!",
  },
  {
    title: "How long does my trip take?",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque dolore ipsum mollitia incidunt voluptas hic sed aspernatur provident, facilis, assumenda odit commodi nam repellat et eius officiis laborum. Cum, deleniti!",
  },
  {
    title: "Do you provide services in Alaska",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque dolore ipsum mollitia incidunt voluptas hic sed aspernatur provident, facilis, assumenda odit commodi nam repellat et eius officiis laborum. Cum, deleniti!",
  },
  {
    title: "Do your busses have air conditioning?",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque dolore ipsum mollitia incidunt voluptas hic sed aspernatur provident, facilis, assumenda odit commodi nam repellat et eius officiis laborum. Cum, deleniti!",
  },
]

const FaqItem = ({ item }: { item: FaqItemType }) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const onClick = () => {
    setIsOpen(isOpen => !isOpen)
  }

  return (
    <Card className="cursor-pointer" onClick={onClick}>
      <CardContent>
        <div className="flex items-center justify-between">
          <Text variant="bodyBig" className="font-bold">
            {item.title}
          </Text>
          <FaChevronDown
            className={`w-4 h-4 transition ${isOpen ? "-rotate-180" : ""}`}
          />
        </div>
        <div
          className="transition-all will-change-[max-height]"
          style={{
            maxHeight: isOpen ? contentRef.current?.scrollHeight + "px" : "0px",
          }}
          ref={contentRef}
        >
          <div
            className={`transition duration-500 ${
              isOpen ? "delay-150" : "opacity-0"
            }`}
          >
            <Text className="pt-6">{item.description}</Text>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export const FaqSection = () => {
  return (
    <SectionAndOffset>
      <Text variant="h4" className="text-center uppercase">
        {"Frequently Asked Questions"}
      </Text>
      <CardContainer>
        {faqItems.map(item => (
          <FaqItem key={item.title} item={item} />
        ))}
      </CardContainer>
    </SectionAndOffset>
  )
}
