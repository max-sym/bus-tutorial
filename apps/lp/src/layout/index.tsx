import React from "react"
import tw from "tailwind-styled-components"
import { useReservationCountdown, useSnipcart } from "utils"
import { Footer } from "./footer"
import { Navbar } from "./navbar"
import { Sidebar } from "@bus/ui"
import { ToastContainer } from "react-toastify"
import { sidebarItemsList } from "./sidebar-items-list"
import { Link } from "gatsby"

const Container = tw.div`bg-white dark:bg-gray-900 transition`
const ContentContainer = tw.div`pt-14`

const Helpers = () => <ToastContainer position="bottom-right" />

export const Layout = ({ children }) => {
  useReservationCountdown()
  useSnipcart()

  return (
    <Container>
      <Navbar />
      <Sidebar Link={Link} sidebarItemsList={sidebarItemsList} />
      <ContentContainer>{children}</ContentContainer>
      <Footer />
      <Helpers />
    </Container>
  )
}

export * from "./seo"
