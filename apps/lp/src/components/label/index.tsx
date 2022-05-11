import React from "react"
import { Text } from "components"

export const Label = ({ children, ...props }) => (
  <Text as="label" variant="subtitle" {...props}>
    {children}
  </Text>
)
