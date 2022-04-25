import React from "react"
import tw from "tailwind-styled-components"

const Container = tw.div``
export * from "./seo"

export const Layout = ({ children }) => {
  return (
    <Container>
      <main>{children}</main>
    </Container>
  )
}
