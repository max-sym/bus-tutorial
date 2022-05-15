import { Footer } from "./footer"
import { Navbar } from "./navbar"
import { LayoutContainer, Sidebar, LayoutContentContainer } from "@bus/ui"
import { ToastContainer } from "react-toastify"
import { getSidebarItemsList } from "./get-sidebar-items-list"
import { Link } from "react-router-dom"
import { useAuthStore } from "@/store"

const Helpers = () => <ToastContainer position="bottom-right" />

export const Layout = ({ children }) => {
  const worker = useAuthStore(store => store.worker)

  return (
    <LayoutContainer>
      <Navbar />
      <Sidebar Link={Link} sidebarItemsList={getSidebarItemsList(worker)} />
      <LayoutContentContainer>{children}</LayoutContentContainer>
      <Footer />
      <Helpers />
    </LayoutContainer>
  )
}
