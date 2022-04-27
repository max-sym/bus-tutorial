import React from "react"
import tw from "tailwind-styled-components"
import { Text } from "components"

const variantClasses = {
  round: "p-2 rounded-full",
  base: "px-5 py-3 rounded-xl",
}

const colorClasses = {
  primary:
    "bg-green-500 text-white border-transparent hover:bg-green-400 dark:bg-transparent dark:text-green-500 dark:border-green-500 dark:hover:bg-green-500 dark:hover:text-white dark:hover:shadow-green-light",
}

const ButtonCore = tw.button<{
  $variant: keyof typeof variantClasses
  $color: keyof typeof colorClasses
}>`font-bold uppercase flex items-center justify-center border transition ease-out
  ${({ $variant }) => variantClasses[$variant]}
  ${({ $color }) => colorClasses[$color]}
`

export const Button = ({
  children,
  variant = "base",
  color = "primary",
  ...props
}: {
  children: any
  variant?: keyof typeof variantClasses
  color?: keyof typeof colorClasses
  [key: string]: any
}) => (
  <ButtonCore $variant={variant} $color={color} {...props}>
    <Text color="no" className="ease-out" variant="button">
      {children}
    </Text>
  </ButtonCore>
)
