import React from "react"
import {
  Navbar as NavbarBase,
  NavItemsContainer,
  NavLogoSection,
  NavItems,
  NavItem,
  Button,
  useModal,
  Modal,
  useUiStore,
  DarkModeSwitch,
} from "@bus/ui"
import { HiOutlineMenu } from "@react-icons/all-files/hi/HiOutlineMenu"
import { useStore, useAuthStore } from "store"
import { BookingForm } from "sections/home/booking-form"
import { useLocation } from "@reach/router"
import { navItemsList } from "./nav-items-list"
import { Link } from "gatsby"
import { ReservationItem } from "./reservation-item"

const DesktopNavbarContent = () => {
  const reservation = useStore(store => store.reservation)
  const user = useAuthStore(store => store.user)

  const location = useLocation()

  const showReservationItem = !!reservation && location.pathname !== "/search"

  return (
    <div className="items-center justify-between flex-1 hidden md:flex">
      <NavItemsContainer>
        <NavLogoSection Link={Link} />
        <NavItems Link={Link} items={navItemsList.left} />
      </NavItemsContainer>
      <NavItemsContainer>
        {showReservationItem && <ReservationItem />}
        <div className="flex items-center justify-center">
          <DarkModeSwitch />
        </div>
        <NavItems
          Link={Link}
          items={user ? navItemsList.rightLoggedIn : navItemsList.right}
        />
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
        <NavLogoSection Link={Link} />
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

export const Navbar = () => (
  <NavbarBase>
    <>
      <DesktopNavbarContent />
      <MobileNavbarContent />
    </>
  </NavbarBase>
)
