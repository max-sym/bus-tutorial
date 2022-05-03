import React from "react"
import { useUiStore } from "store"
import tw from "tailwind-styled-components"
import { RiCloseFill } from "@react-icons/all-files/ri/RiCloseFill"

const Container = tw.div<{ $isSidebarOpen: boolean }>`fixed inset-0 z-20 ${({
  $isSidebarOpen,
}) => ($isSidebarOpen ? "" : "pointer-events-none")}`

const Box = tw.div<{
  $isSidebarOpen: boolean
}>`absolute w-full h-full bg-black transition duration-500 ease-in-out ${({
  $isSidebarOpen,
}) => ($isSidebarOpen ? "" : "-translate-y-[700px] opacity-0 delay-200")}`

const CrossContainer = tw.button<{
  $isSidebarOpen: boolean
}>`absolute z-20 top-4 right-4 transition duration-300 appearance-none ${({
  $isSidebarOpen,
}) => ($isSidebarOpen ? "delay-300" : "opacity-0")} `

const CrossButton = ({
  isSidebarOpen,
  onClick,
}: {
  isSidebarOpen: boolean
  onClick: any
}) => (
  <CrossContainer $isSidebarOpen={isSidebarOpen} onClick={onClick}>
    <RiCloseFill className="w-12 h-12 text-white" />
  </CrossContainer>
)

export const Sidebar = () => {
  const isSidebarOpen = useUiStore(store => store.isSidebarOpen)

  const onCrossClick = () => {
    useUiStore.setState({ isSidebarOpen: false })
  }

  return (
    <Container $isSidebarOpen={isSidebarOpen}>
      <CrossButton isSidebarOpen={isSidebarOpen} onClick={onCrossClick} />
      <Box $isSidebarOpen={isSidebarOpen} />
    </Container>
  )
}
