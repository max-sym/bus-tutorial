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
// import { useStore, useAuthStore } from "store"
import { useLocation } from "@reach/router"
import { navItemsList } from "./nav-items-list"
import { ReservationItem } from "./reservation-item"
import { Link } from "react-router-dom"

const DesktopNavbarContent = () => {
  // const user = useAuthStore(store => store.user)
  const user = null
  const location = useLocation()

  return (
    <div className="items-center justify-between flex-1 hidden md:flex">
      <NavItemsContainer>
        <NavLogoSection Link={Link} />
        <NavItems Link={Link} items={navItemsList.left} />
      </NavItemsContainer>
      <NavItemsContainer>
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

const MobileNavbarContent = () => {
  return (
    <div className="md:hidden">
      <NavItemsContainer>
        <NavLogoSection Link={Link} />

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
