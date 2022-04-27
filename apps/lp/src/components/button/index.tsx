import React from "react"
import tw from "tailwind-styled-components"
import { Text } from "components"

const ButtonCore = tw.button`bg-green-500 px-5 py-3 rounded-xl text-white font-bold uppercase`

export const Button = ({ children, ...props }) => (
  <ButtonCore {...props}>
    <Text variant="button">{children}</Text>
  </ButtonCore>
)
