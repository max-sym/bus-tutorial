import React from "react"
import tw from "tailwind-styled-components"
import { InView } from "react-cool-inview"
import { Text } from "@bus/ui"

const Container = tw.div`fixed left-0 right-0 top-0 z-20 transition duration-[2000ms] delay-500`
const Box = tw.div`bg-black bg-opacity-50 w-full backdrop-filter backdrop-blur`
const WidthContainer = tw.div`md:max-w-screen-2xl w-full mx-auto md:px-4`
export const NavItemsContainer = tw.div`flex items-center justify-between md:justify-center`
const NavItemContainer = tw.div`px-2 py-4 cursor-pointer`

type NavItemType = {
  title: string
  link: string
}

export const NavItem = ({ children, ...props }) => (
  <NavItemContainer {...props}>
    {typeof children === "string" ? (
      <Text variant="subtitle" className="uppercase" color="white">
        {children}
      </Text>
    ) : (
      children
    )}
  </NavItemContainer>
)

export const NavItems = ({
  items,
  Link,
}: {
  items: NavItemType[]
  Link: any
}) => (
  <div className="flex">
    {items.map(item => (
      <Link key={item.title} to={item.link}>
        <NavItem>{item.title}</NavItem>
      </Link>
    ))}
  </div>
)

export const NavbarCore = ({ observe, inView, children }: any) => (
  <Container ref={observe} className={`${inView ? "" : "opacity-0"}`}>
    <Box>
      <WidthContainer>{children}</WidthContainer>
    </Box>
  </Container>
)

export const Navbar = ({ children }) => (
  <InView unobserveOnEnter>
    <NavbarCore>{children}</NavbarCore>
  </InView>
)
