import React from "react"
import tw from "tailwind-styled-components"
import { Text } from "@bus/ui"

export const CardNotRounded = tw.div`bg-white dark:bg-gray-800 shadow-xl border border-gray-300 dark:border-gray-700 overflow-hidden relative`

export const Card = tw(CardNotRounded)`rounded-2xl md:rounded-3xl`
export const CardContent = tw.div`p-2 md:p-4 relative`

export const CardTitle = ({ children, ...props }) => (
  <Text variant="button" {...props}>
    {children}
  </Text>
)

export const CardHeading = tw.div`px-2 pt-2 md:px-4 md:pt-4`
export const CardFooter = tw.div`p-2 md:p-4`
