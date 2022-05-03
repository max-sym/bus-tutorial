import React from "react"
import tw from "tailwind-styled-components"
import { Text } from "components"
import { Link } from "gatsby"
import { InView } from "react-cool-inview"
import { DarkModeSwitch } from "./dark-mode-switch"
import { FaBus } from "@react-icons/all-files/fa/FaBus"
import { HiOutlineMenu } from "@react-icons/all-files/hi/HiOutlineMenu"

const Container = tw.div`fixed left-0 right-0 top-0 z-20 transition duration-[2000ms] delay-500`
const Box = tw.div`bg-black bg-opacity-50 w-full backdrop-filter backdrop-blur`
const WidthContainer = tw.div`max-w-screen-2xl w-full mx-auto px-4`
const NavItemsContainer = tw.div`flex items-center justify-between md:justify-center`

type NavItemType = {
  title: string
  link: string
}

const navItems: {
  [key: string]: NavItemType[]
} = {
  left: [
    {
      title: "About",
      link: "/#about",
    },
    {
      title: "VIP",
      link: "/#vip",
    },
    {
      title: "Reviews",
      link: "/#reviews",
    },
    {
      title: "FAQ",
      link: "/#faq",
    },
  ],
  right: [
    {
      title: "Account",
      link: "/account",
    },
    {
      title: "Log Out",
      link: "/logout",
    },
  ],
}

const NavLogoSection = () => (
  <Link to="/">
    <div className="flex items-center justify-center px-2">
      <BusLogo className="w-6 h-6" />
    </div>
  </Link>
)

const NavItemContainer = tw.div`px-2 py-4`
const BusLogo = tw(FaBus)`text-white`

const NavItem = ({ children }) => (
  <NavItemContainer>
    <Text variant="subtitle" className="uppercase" color="white">
      {children}
    </Text>
  </NavItemContainer>
)

const NavItems = ({ items }: { items: NavItemType[] }) => (
  <div className="flex">
    {items.map(item => (
      <Link key={item.title} to={item.link}>
        <NavItem>{item.title}</NavItem>
      </Link>
    ))}
  </div>
)

const DesktopNavbarContent = () => (
  <div className="items-center justify-between flex-1 hidden md:flex">
    <NavItemsContainer>
      <NavLogoSection />
      <NavItems items={navItems.left} />
    </NavItemsContainer>
    <NavItemsContainer>
      <div className="flex items-center justify-center">
        <DarkModeSwitch />
      </div>
      <NavItems items={navItems.right} />
    </NavItemsContainer>
  </div>
)

const MenuLauncher = () => (
  <NavItem>
    <HiOutlineMenu className="w-8 h-8" />
  </NavItem>
)

const MobileNavbarContent = () => (
  <div className="md:hidden">
    <NavItemsContainer>
      <NavLogoSection />
      <MenuLauncher />
    </NavItemsContainer>
  </div>
)

export const NavbarCore = ({ observe, inView, children }: any) => (
  <Container ref={observe} className={`${inView ? "" : "opacity-0"}`}>
    <Box>
      <WidthContainer>{children}</WidthContainer>
    </Box>
  </Container>
)

export const Navbar = () => (
  <InView>
    <NavbarCore>
      <DesktopNavbarContent />
      <MobileNavbarContent />
    </NavbarCore>
  </InView>
)
