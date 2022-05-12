import React from "react"
import tw from "tailwind-styled-components"
import { useReservationCountdown, useSnipcart } from "utils"
import { Footer } from "./footer"
import { Navbar } from "./navbar"
import { Sidebar } from "./sidebar"

const Container = tw.div`bg-white dark:bg-gray-900 transition`
const ContentContainer = tw.div`pt-14`
export * from "./seo"

export const Layout = ({ children }) => {
  useReservationCountdown()
  useSnipcart()

  return (
    <Container>
      <Navbar />
      <Sidebar />
      <ContentContainer>{children}</ContentContainer>
      <Footer />
    </Container>
  )
}
