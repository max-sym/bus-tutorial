import { Card, CardContent, SectionAndOffset, Text } from "components"
import React from "react"
import tw from "tailwind-styled-components"
import { BsStarFill } from "@react-icons/all-files/bs/BsStarFill"
import { IoMdQuote } from "@react-icons/all-files/io/IoMdQuote"
import { InView } from "react-cool-inview"

const CardsContainer = tw.div`flex justify-center gap-4 mt-14`
const ImageContainer = tw.div`rounded-full overflow-hidden w-14 h-14`
const Star = tw(BsStarFill)`w-4 h-4 text-yellow-500`

type ReviewType = {
  name: string
  timeAgo: string
  content: string
  imageUrl: string
  starsCount: number
}

const reviews: ReviewType[] = [
  {
    name: "Julie M.",
    timeAgo: "2 days ago",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque dolore ipsum mollitia incidunt voluptas hic sed aspernatur provident, facilis, assumenda odit commodi nam repellat et eius officiis laborum. Cum, deleniti!",
    imageUrl: "https://randomuser.me/api/portraits/women/17.jpg",
    starsCount: 5,
  },
  {
    name: "Kirk H.",
    timeAgo: "5 days ago",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque dolore ipsum mollitia incidunt voluptas hic sed aspernatur provident, facilis, assumenda odit commodi nam repellat et eius officiis laborum. Cum, deleniti!",
    imageUrl: "https://randomuser.me/api/portraits/men/0.jpg",
    starsCount: 5,
  },
  {
    name: "Joe B.",
    timeAgo: "7 days ago",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque dolore ipsum mollitia incidunt voluptas hic sed aspernatur provident, facilis, assumenda odit commodi nam repellat et eius officiis laborum. Cum, deleniti!",
    imageUrl: "https://randomuser.me/api/portraits/women/24.jpg",
    starsCount: 5,
  },
]

const Stars = ({ item }: { item: ReviewType }) => {
  const starsArray = new Array(item.starsCount).fill(0).map((_starItem, i) => i)

  return (
    <div className="flex items-center gap-x-1">
      {starsArray.map(i => (
        <Star key={i} />
      ))}
    </div>
  )
}

const ReviewItem = ({ item }: { item: ReviewType }) => {
  const quotedContent = `"${item.content}"`

  return (
    <Card>
      <CardContent className="">
        <div className="flex items-start gap-x-4">
          <ImageContainer>
            <img src={item.imageUrl} alt={item.name} />
          </ImageContainer>
          <div>
            <div className="flex gap-x-3">
              <Text variant="bodyBig">{item.name}</Text>
              <Stars item={item} />
            </div>
            <Text variant="subtitle">{item.timeAgo}</Text>
          </div>
        </div>
        <Text className="mt-4 italic">{quotedContent}</Text>
        <div className="absolute top-4 right-4">
          <IoMdQuote className="fill-green-500" />
        </div>
      </CardContent>
    </Card>
  )
}

export const ReviewsSectionCore = ({ inView, observe }: any) => (
  <SectionAndOffset ref={observe}>
    <Text
      variant="h4"
      className={`text-center uppercase transition duration-1000 delay-150 ${
        inView ? "" : "opacity-0"
      }`}
    >
      {"What Our Clients Say"}
    </Text>
    <CardsContainer>
      {reviews.map((item, index) => (
        <div
          key={item.name}
          className={`transition duration-1000 ${inView ? "" : "opacity-0"}`}
          style={{
            transitionDelay: 300 + 150 * index + "ms",
          }}
        >
          <ReviewItem item={item} />
        </div>
      ))}
    </CardsContainer>
  </SectionAndOffset>
)

export const ReviewsSection = () => (
  <InView unobserveOnEnter>
    <ReviewsSectionCore />
  </InView>
)
