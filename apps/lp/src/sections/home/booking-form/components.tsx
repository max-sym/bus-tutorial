import React from "react"
import { Button } from "../../../components/button"
import { Text } from "../../../components/text"
import { Card } from "../../../components/card"
import tw from "tailwind-styled-components"

export const Container = tw(
  Card
)`flex justify-between flex-col md:flex-row p-6 space-y-2 md:space-y-0 md:space-x-2`
export const InputContainer = tw.div`relative w-full md:w-1/3 flex flex-col justify-center items-center`

export const GuestOkButton = tw(Button)`mx-auto w-5/6 mb-2`

export const IconContainer = tw.a`z-20 absolute top-0 right-0 bottom-0 h-full flex items-center pr-2 cursor-pointer group-hover:text-green-500 peer-focus:text-green-500 text-gray-500 transition`

export const MenuContainer = tw.div`z-20`
export const Menu = tw(Card)<{ open: boolean }>`
  w-64 max-h-[280px] border z-20 shadow-lg transform transition ease-in-out bg-white rounded-3xl overflow-y-auto overflow-x-hidden
  ${({ open }) => (open ? "" : "opacity-0 -translate-y-4 pointer-events-none")}
`

export const OptionBase = tw.div`transition ease-in-out relative py-2 px-4`

export const OptionContainer = React.forwardRef(
  ({ children, ...props }, ref) => (
    <OptionBase
      className="cursor-pointer hover:bg-green-100 dark:hover:bg-gray-700"
      ref={ref}
      {...props}
    >
      <Text variant="subtitle">{children}</Text>
    </OptionBase>
  )
)

export const GuestButton = tw.button`appearance-none rounded-full p-2 flex items-center justify-center h-full overflow-hidden border border-gray-500 text-gray-500 hover:text-white hover:bg-green-500 hover:border-transparent transition ease-in-out disabled:opacity-50`
