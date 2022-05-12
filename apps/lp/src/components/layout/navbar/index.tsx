import React from "react"
import tw from "tailwind-styled-components"
import { Link } from "gatsby"
import { InView } from "react-cool-inview"
import { FaBus } from "@react-icons/all-files/fa/FaBus"
import { HiOutlineMenu } from "@react-icons/all-files/hi/HiOutlineMenu"
import { Text, Button, useModal, Modal } from "components"
import { DarkModeSwitch } from "./dark-mode-switch"
import { useStore, useUiStore } from "store"
import { BookingForm } from "sections/home/booking-form"
import { useLocation } from "@reach/router"
import { FaShoppingCart } from "@react-icons/all-files/fa/FaShoppingCart"
import { ReservationBar } from "sections/search/reservation-bar"

const Container = tw.div`fixed left-0 right-0 top-0 z-20 transition duration-[2000ms] delay-500`
const Box = tw.div`bg-black bg-opacity-50 w-full backdrop-filter backdrop-blur`
const WidthContainer = tw.div`md:max-w-screen-2xl w-full mx-auto md:px-4`
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

const NavItemContainer = tw.div`px-2 py-4 cursor-pointer`
const BusLogo = tw(FaBus)`text-white`

const NavItem = ({ children, ...props }) => (
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

const NavItems = ({ items }: { items: NavItemType[] }) => (
  <div className="flex">
    {items.map(item => (
      <Link key={item.title} to={item.link}>
        <NavItem>{item.title}</NavItem>
      </Link>
    ))}
  </div>
)

const RedDot = tw.div`absolute -bottom-1 -right-1 w-2 h-2 bg-red-500 rounded-full`

const ReservationItem = () => {
  const modal = useModal({ customComponent: <ReservationBar /> })

  const onClick = () => {
    modal.setIsOpen(true)
  }

  return (
    <NavItem onClick={onClick}>
      <div className="relative">
        <FaShoppingCart className="w-6 h-6 text-white md:w-4 md:h-4" />
        <RedDot />
      </div>
      <Modal modal={modal} />
    </NavItem>
  )
}

const DesktopNavbarContent = () => {
  const reservation = useStore(store => store.reservation)

  const location = useLocation()

  const showReservationItem = !!reservation && location.pathname !== "/search"

  return (
    <div className="items-center justify-between flex-1 hidden md:flex">
      <NavItemsContainer>
        <NavLogoSection />
        <NavItems items={navItems.left} />
      </NavItemsContainer>
      <NavItemsContainer>
        {showReservationItem && <ReservationItem />}
        <div className="flex items-center justify-center">
          <DarkModeSwitch />
        </div>
        <NavItems items={navItems.right} />
      </NavItemsContainer>
    </div>
  )
}

const MenuLauncher = () => {
  const onClick = () => {
    useUiStore.setState({ isSidebarOpen: true })
  }

  return (
    <NavItem onClick={onClick}>
      <HiOutlineMenu className="w-8 h-8 text-white" />
    </NavItem>
  )
}

const MobileBookingForm = ({ modal }: any) => <BookingForm modal={modal} />

const MobileNavbarContent = () => {
  const modal = useModal({ customComponent: <MobileBookingForm /> })
  const location = useLocation()
  const reservation = useStore(store => store.reservation)

  const launchMobileBookingForm = () => {
    modal.setIsOpen(true)
  }

  // SpecialAction meaning either shopcart icon or a CTA button.
  const showSpecialAction = location.pathname !== "/search"

  return (
    <div className="md:hidden">
      <NavItemsContainer>
        <NavLogoSection />

        {showSpecialAction &&
          (!!reservation ? (
            <ReservationItem />
          ) : (
            <Button variant="sm" onClick={launchMobileBookingForm}>
              {"Where are you going?"}
            </Button>
          ))}

        <Modal modal={modal} />
        <MenuLauncher />
      </NavItemsContainer>
    </div>
  )
}

export const NavbarCore = ({ observe, inView, children }: any) => (
  <Container ref={observe} className={`${inView ? "" : "opacity-0"}`}>
    <Box>
      <WidthContainer>{children}</WidthContainer>
    </Box>
  </Container>
)

export const Navbar = () => (
  <InView unobserveOnEnter>
    <NavbarCore>
      <DesktopNavbarContent />
      <MobileNavbarContent />
    </NavbarCore>
  </InView>
)
