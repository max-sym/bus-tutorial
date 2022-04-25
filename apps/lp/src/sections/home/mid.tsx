import { SectionAndOffset } from "components"
import React from "react"
import tw from "tailwind-styled-components"

const Column = tw.div`w-1/2`
const ImageContainer = tw.div`rounded-3xl overflow-hidden h-[600px] shadow-xl`
const Image = tw.img`w-full h-full object-cover`

const TopPart = ({ section }) => (
  <>
    <h3 className="text-center text-4xl font-bold uppercase">
      {section.title}
    </h3>
    <p className="text-center w-1/3 mx-auto mt-4">{section.description}</p>
  </>
)

const FeatureItem = ({ feature }) => (
  <div className="flex space-x-4">
    <div>{<feature.icon className="w-8 h-8" />}</div>
    <div>
      <h5 className="font-bold text-gray-900 uppercase text-2xl">
        {feature.title}
      </h5>
      <p>{feature.description}</p>
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
        <h3 className="text-4xl font-bold uppercase">
          {section.featuresTitle}
        </h3>
        <div className="mt-12 space-y-8">
          {section.features.map(feature => (
            <FeatureItem feature={feature} />
          ))}
        </div>
      </Column>
    </Container>
  </SectionAndOffset>
)
