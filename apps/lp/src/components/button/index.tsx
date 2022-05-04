import React from "react"
import tw from "tailwind-styled-components"
import { Text } from "components"

const variantClasses = {
  round: "p-2 rounded-full",
  base: "px-6 py-2 rounded-xl",
  sm: "px-2 py-1 rounded-md",
}

const colorClasses = {
  primary:
    "bg-green-500 text-white border-transparent hover:bg-green-400 dark:bg-transparent dark:text-green-500 dark:border-green-500 dark:hover:bg-green-500 dark:hover:text-white dark:hover:shadow-green-light",
  red: "bg-red-500 text-white border-transparent hover:bg-red-400 dark:bg-transparent dark:text-red-500 dark:border-red-500 dark:hover:bg-red-500 dark:hover:text-white dark:hover:shadow-red-light",
}

const ButtonCore = tw.button<{
  $variant: keyof typeof variantClasses
  $color: keyof typeof colorClasses
}>`font-bold uppercase flex items-center justify-center border transition ease-out whitespace-nowrap
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
    <Text color="none" className="ease-out" variant="button">
      {children}
    </Text>
  </ButtonCore>
)
