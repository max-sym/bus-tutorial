import tw from "tailwind-styled-components"

const colorClasses = {
  none: "",
  white: "text-white",
  base: "text-gray-900 dark:text-white",
  "gray-light": "text-gray-600 dark:text-gray-400",
  green: "text-green-500",
  red: "text-red-500",
}

const variantClasses = {
  h3: "text-3xl md:text-5xl font-title font-bold uppercase",
  h4: "text-2xl md:text-4xl font-title font-bold uppercase",
  h5: "text-xl md:text-3xl font-title font-bold uppercase",
  h6: "text-lg md:text-2xl font-title font-bold uppercase",
  bodyBig: "md:text-xl font-title",
  body: "md:text-lg font-title",
  subtitle: "text-sm md:text-sm font-title",
  button: "text-base md:text-lg font-title font-bold uppercase",
  caption: "text-xs md:text-xs font-title",
  overline: "text-xs md:text-xs font-title",
}

export type TextProps = {
  variant?: keyof typeof variantClasses
  color?: keyof typeof colorClasses
}

export const Text = tw.p<TextProps>`transition text
${({ variant = "body" }) => variantClasses[variant]}
${({ color = "base" }) => colorClasses[color]}
`
