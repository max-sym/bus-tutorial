import React from "react"
import { Layout, Seo } from "components"
import { SearchSection } from "sections"

const SearchPage = () => (
  <Layout>
    <Seo title="Search" />
    <SearchSection />
  </Layout>
)

export default SearchPage
