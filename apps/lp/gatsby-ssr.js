import "@bus/ui/src/index.css"
import "@bus/ui/src/custom.css"
import "./src/styles/custom.css"
import "flatpickr/dist/themes/dark.css"
import "react-toastify/dist/ReactToastify.min.css"
import React from "react"
import { Layout } from "./src/layout"

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
