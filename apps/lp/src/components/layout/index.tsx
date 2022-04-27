import React from "react"
import tw from "tailwind-styled-components"
import { Footer } from "./footer"
import { Navbar } from "./navbar"

const Container = tw.div`bg-white dark:bg-gray-900 transition`
const ContentContainer = tw.div`pt-14`
export * from "./seo"

export const Layout = ({ children }) => {
  return (
    <Container>
      <Navbar />
      <ContentContainer>{children}</ContentContainer>
      <Footer />
    </Container>
  )
}
