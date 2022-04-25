import React from "react"
import { Layout, Seo } from "../components"
import { HeroSection } from "../sections"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <HeroSection />
  </Layout>
)

export default IndexPage
