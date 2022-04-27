import { Card } from "components"
import tw from "tailwind-styled-components"

export const Container = tw(Card)`flex justify-between p-6`
export const InputContainer = tw.div`relative w-full md:w-1/3 flex flex-col justify-center items-center pl-2`
export const InputCore = tw.input`relative w-full peer flex h-10 focus:outline-none appearance-none border border-gray-300 rounded-full outline-none transition pl-4 pr-6 group-hover:border-green-500 focus:border-green-500 cursor-pointer`
export const Label = tw.div`text-sm w-full font-bold mb-1 text-gray-500`

export const ButtonCore = tw.button`appearance-none h-10 rounded-full flex justify-center items-center font-bold px-3`
export const SwapButton = tw(ButtonCore)`
md:mt-5 border md:w-full border-gray-300 hover:border-green-500 hover:text-green-500 focus:border-green-500 focus:text-green-500 transition outline-none`
export const PrimaryButton = tw(ButtonCore)`
border-0 bg-green-500 text-white uppercase`
export const GuestOkButton = tw(PrimaryButton)`mx-auto w-5/6 mb-2`
export const SearchButton = tw(PrimaryButton)`w-full mt-5`

export const IconContainer = tw.a`z-20 absolute top-0 right-0 bottom-0 h-full flex items-center pr-2 cursor-pointer group-hover:text-green-500 peer-focus:text-green-500 text-gray-500 transition`

export const MenuContainer = tw.div`z-20`
export const Menu = tw.ul<{ open: boolean }>`
  w-64 max-h-[240px] border z-20 shadow-lg transform transition ease-in-out bg-white rounded-3xl overflow-y-auto overflow-x-hidden
  ${({ open }) => (open ? "" : "opacity-0 -translate-y-4 pointer-events-none")}
`
export const Text = tw.p`text-sm font-bold text-gray-700 font-title`
export const SmallText = tw.p`text-sm text-gray-500`

export const OptionBase = tw.div`transition ease-in-out relative py-2 px-4`
export const OptionContainer = tw(OptionBase)<{
  $active?: boolean
  $selected?: boolean
}>`cursor-pointer transition ${({ $active, $selected }) =>
  $active || $selected ? "bg-green-100" : ""}`

export const GuestButton = tw.button`appearance-none rounded-full p-2 flex items-center justify-center h-full overflow-hidden border border-gray-500 text-gray-500 hover:text-white hover:bg-green-500 hover:border-transparent transition ease-in-out disabled:opacity-50`
