import React from "react"
import { Text } from "@bus/ui"

export const Label = ({ children, color = "gray-light", ...props }) => (
  <Text $as="label" variant="subtitle" color={color} {...props}>
    {children}
  </Text>
)
