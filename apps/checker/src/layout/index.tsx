import React from "react"
import { Footer } from "./footer"
import { Navbar } from "./navbar"
import { LayoutContainer, Sidebar, LayoutContentContainer } from "@bus/ui"
import { ToastContainer } from "react-toastify"
import { sidebarItemsList } from "./sidebar-items-list"
import { Link } from "react-router-dom"

const Helpers = () => <ToastContainer position="bottom-right" />

export const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Navbar />
      <Sidebar Link={Link} sidebarItemsList={sidebarItemsList} />
      <LayoutContentContainer>{children}</LayoutContentContainer>
      <Footer />
      <Helpers />
    </LayoutContainer>
  )
}
