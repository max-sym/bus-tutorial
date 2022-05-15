import React from "react"
import tw from "tailwind-styled-components"
import { useReservationCountdown, useSnipcart } from "utils"
import { Footer } from "./footer"
import { Navbar } from "./navbar"
import { Sidebar } from "@bus/ui"
import { ToastContainer } from "react-toastify"
import { getSidebarItemsList } from "./get-sidebar-items-list"
import { Link } from "gatsby"
import { useAuthStore } from "store"

const Container = tw.div`bg-white dark:bg-gray-900 transition`
const ContentContainer = tw.div`pt-14`

const Helpers = () => <ToastContainer position="bottom-right" />

export const Layout = ({ children }) => {
  useReservationCountdown()
  useSnipcart()

  const user = useAuthStore(store => store.user)

  return (
    <Container>
      <Navbar />
      <Sidebar Link={Link} sidebarItemsList={getSidebarItemsList(user)} />
      <ContentContainer>{children}</ContentContainer>
      <Footer />
      <Helpers />
    </Container>
  )
}

export * from "./seo"
