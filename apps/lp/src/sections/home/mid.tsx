import { SectionAndOffset, Text } from "components"
import React from "react"
import tw from "tailwind-styled-components"

const Column = tw.div`w-1/2`
const ImageContainer = tw.div`rounded-3xl overflow-hidden h-[600px] shadow-xl`
const Image = tw.img`w-full h-full object-cover`

const TopPart = ({ section }) => (
  <>
    <Text variant="h4" className="text-center uppercase">
      {section.title}
    </Text>
    <Text variant={"bodyBig"} className="text-center w-1/2 mx-auto mt-8">
      {section.description}
    </Text>
  </>
)

const FeatureItem = ({ feature }) => (
  <div className="flex space-x-4">
    <div>{<feature.icon className="w-8 h-8" />}</div>
    <div>
      <Text variant="button">{feature.title}</Text>
      <Text variant="body" className="mt-2">
        {feature.description}
      </Text>
    </div>
  </div>
)

const Container = tw.div`flex justify-between mt-20 gap-12
${({ direction }) => (direction === "left" ? "flex-row" : "flex-row-reverse")}
`

export const MidSection = ({ section }) => (
  <SectionAndOffset>
    <TopPart section={section} />
    <Container direction={section.direction}>
      <Column>
        <ImageContainer>
          <Image src={section.imageUrl} alt={section.imageAlt} />
        </ImageContainer>
      </Column>
      <Column>
        <Text variant="h5">{section.featuresTitle}</Text>
        <div className="mt-12 space-y-8">
          {section.features.map(feature => (
            <FeatureItem key={feature.title} feature={feature} />
          ))}
        </div>
      </Column>
    </Container>
  </SectionAndOffset>
)
