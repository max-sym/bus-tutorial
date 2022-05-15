import React from "react"
import tw from "tailwind-styled-components"
import { ToastContainer } from "react-toastify"

export * from "./navbar"
export * from "./sidebar"

export const LayoutContainer = tw.div`bg-white dark:bg-gray-900 transition`

export const LayoutContentContainer = tw.div`pt-14`

export const LayoutHelpers = () => <ToastContainer position="bottom-right" />
