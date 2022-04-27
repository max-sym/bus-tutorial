import React from "react"
import { Button, SectionAndOffset, Text } from "components"
import { LogoTitle } from "./hero"
import { InView } from "react-cool-inview"

export const BottomHeroSectionCore = ({ observe, inView }: any) => (
  <SectionAndOffset ref={observe}>
    <div className="flex flex-col items-center">
      <LogoTitle inView={inView} />
    </div>
    <div
      className={`flex flex-col items-center w-1/3 mx-auto mt-8 text-center transition duration-700 delay-[1400ms] ${
        inView ? "" : "opacity-0"
      }`}
    >
      <Text>
        {
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias ipsam at autem, aperiam doloribus beatae sed quasi distinctio reiciendis odio commodi!"
        }
      </Text>
      <div className="mt-8">
        <Button>{"Book Now"}</Button>
      </div>
    </div>
  </SectionAndOffset>
)

export const BottomHeroSection = () => (
  <InView>
    <BottomHeroSectionCore />
  </InView>
)
