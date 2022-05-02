import React from "react"
import tw from "tailwind-styled-components"
import { Text } from "components"

export const Card = tw.div`bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-300 dark:border-gray-700 overflow-hidden relative`
export const CardContent = tw.div`px-4 py-4 relative`

export const CardTitle = ({ children, ...props }) => (
  <Text variant="button" {...props}>
    {children}
  </Text>
)

export const CardHeading = tw.div`px-4 pt-4`
export const CardFooter = tw.div`px-4 py-4`
