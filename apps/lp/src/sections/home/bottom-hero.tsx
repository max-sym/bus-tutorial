import React from "react"
import { Button, SectionAndOffset, Text } from "components"
import { LogoTitle } from "./hero"

export const BottomHeroSection = () => (
  <SectionAndOffset>
    <div className="flex flex-col items-center">
      <LogoTitle />
    </div>
    <div className="flex flex-col items-center w-1/3 text-center mx-auto mt-8">
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
