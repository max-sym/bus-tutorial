import React from "react"
import tw from "tailwind-styled-components"
import { useUiStore } from "store"
import { Text } from "@bus/ui"
import { RiCloseFill } from "@react-icons/all-files/ri/RiCloseFill"

type SidebarTW = { $isSidebarOpen: boolean }

const Container = tw.div<SidebarTW>`fixed inset-0 z-20 ${({ $isSidebarOpen }) =>
  $isSidebarOpen ? "" : "pointer-events-none"}`

const Box = tw.div<SidebarTW>`absolute w-full h-full bg-black transition duration-500 ease-in-out ${({
  $isSidebarOpen,
}) => ($isSidebarOpen ? "" : "-translate-y-[700px] opacity-0 delay-200")}`

const CrossContainer = tw.button<SidebarTW>`absolute z-20 top-4 right-4 transition duration-300 appearance-none ${({
  $isSidebarOpen,
}) => ($isSidebarOpen ? "delay-300" : "opacity-0")} `

const Content = tw.div`absolute inset-0 flex flex-col gap-y-5 px-8 py-8 mt-12`

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

const SidebarLinkContainer = tw.div<SidebarTW>`w-full py-1 transition duration-500 ease-in-out ${({
  $isSidebarOpen,
}) => ($isSidebarOpen ? "" : "translate-y-16 opacity-0")}`

const SidebarLink = ({ isSidebarOpen, navLink, index, closeSidebar, Link }) => (
  <Link to={navLink.link} onClick={closeSidebar}>
    <SidebarLinkContainer
      $isSidebarOpen={isSidebarOpen}
      style={{
        transitionDelay: isSidebarOpen ? index * 50 + "ms" : undefined,
      }}
    >
      <Text color="none" className="text-white" variant="button">
        {navLink.title}
      </Text>
    </SidebarLinkContainer>
  </Link>
)

export const Sidebar = ({ Link, sidebarItemsList }) => {
  const isSidebarOpen = useUiStore(store => store.isSidebarOpen)

  const closeSidebar = () => {
    useUiStore.setState({ isSidebarOpen: false })
  }

  return (
    <Container $isSidebarOpen={isSidebarOpen}>
      <CrossButton isSidebarOpen={isSidebarOpen} onClick={closeSidebar} />
      <Box $isSidebarOpen={isSidebarOpen} />
      <Content>
        {sidebarItemsList.map((navLink, index) => (
          <SidebarLink
            navLink={navLink}
            index={index}
            closeSidebar={closeSidebar}
            key={navLink.title}
            isSidebarOpen={isSidebarOpen}
            Link={Link}
          />
        ))}
      </Content>
    </Container>
  )
}
