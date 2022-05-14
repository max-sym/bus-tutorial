import React from "react"
import tw from "tailwind-styled-components"
import { FaShoppingCart } from "@react-icons/all-files/fa/FaShoppingCart"
import { Modal, NavItem, useModal } from "@bus/ui"
import { ReservationBar } from "sections/search/reservation-bar"

const RedDot = tw.div`absolute -bottom-1 -right-1 w-2 h-2 bg-red-500 rounded-full`

export const ReservationItem = () => {
  const modal = useModal({ customComponent: <ReservationBar /> })

  const onClick = () => {
    modal.setIsOpen(true)
  }

  return (
    <NavItem onClick={onClick}>
      <div className="relative">
        <FaShoppingCart className="w-6 h-6 text-white md:w-4 md:h-4" />
        <RedDot />
      </div>
      <Modal modal={modal} />
    </NavItem>
  )
}
