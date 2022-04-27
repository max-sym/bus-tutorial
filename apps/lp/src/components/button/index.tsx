import React from "react"
import tw from "tailwind-styled-components"
import { Text } from "components"

const variantClasses = {
  round: "p-2 rounded-full",
  base: "px-5 py-3 rounded-xl",
}

const ButtonCore = tw.button<{
  $variant: keyof typeof variantClasses
}>`bg-green-500 text-white font-bold uppercase flex items-center justify-center
  ${({ $variant }) => variantClasses[$variant]}
`

export const Button = ({
  children,
  variant = "base",
  ...props
}: {
  children: any
  variant?: keyof typeof variantClasses
  [key: string]: any
}) => (
  <ButtonCore $variant={variant} {...props}>
    <Text variant="button">{children}</Text>
  </ButtonCore>
)
