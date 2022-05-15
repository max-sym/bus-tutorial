import React from "react"
import tw from "tailwind-styled-components"
import { FaBus } from "@react-icons/all-files/fa/FaBus"

const BusLogo = tw(FaBus)`text-white`

export const NavLogoSection = ({ Link }) => (
  <Link to="/">
    <div className="flex items-center justify-center px-2">
      <BusLogo className="w-6 h-6" />
    </div>
  </Link>
)
