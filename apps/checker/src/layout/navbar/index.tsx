import {
  Navbar as NavbarBase,
  NavItemsContainer,
  NavLogoSection,
  NavItems,
  NavItem,
  useUiStore,
  DarkModeSwitch,
} from "@bus/ui"
import { HiOutlineMenu } from "@react-icons/all-files/hi/HiOutlineMenu"
import { navItemsList } from "./nav-items-list"
import { ReservationItem } from "./reservation-item"
import { Link, useLocation } from "react-router-dom"
import { useAuthStore } from "@/store"

const DesktopNavbarContent = () => {
  const worker = useAuthStore(store => store.worker)

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
          items={worker ? navItemsList.rightLoggedIn : navItemsList.right}
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
