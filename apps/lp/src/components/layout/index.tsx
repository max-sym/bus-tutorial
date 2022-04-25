import React from "react"
import tw from "tailwind-styled-components"
import { Footer } from "./footer"

const Container = tw.div``
export * from "./seo"

export const Layout = ({ children }) => {
  return (
    <Container>
      <main>{children}</main>
      <Footer />
    </Container>
  )
}
