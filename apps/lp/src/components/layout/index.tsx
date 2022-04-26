import React from "react"
import tw from "tailwind-styled-components"
import { Footer } from "./footer"
import { Navbar } from "./navbar"

const Container = tw.div``
export * from "./seo"

export const Layout = ({ children }) => {
  return (
    <Container>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </Container>
  )
}
