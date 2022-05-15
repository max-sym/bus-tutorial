import React from "react"
import { HiOutlineMenu } from "@react-icons/all-files/hi/HiOutlineMenu"
import { useUiStore } from "@bus/ui"
import { NavItem } from "./navbar"

export const MenuLauncher = () => {
  const onClick = () => {
    useUiStore.setState({ isSidebarOpen: true })
  }

  return (
    <NavItem onClick={onClick}>
      <HiOutlineMenu className="w-8 h-8 text-white" />
    </NavItem>
  )
}
