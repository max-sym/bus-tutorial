import React from "react"
import { Card, Section } from "components"
import { TicketCards } from "./ticket-cards"
import { ReservationBar } from "sections/search/reservation-bar"
import { MobileReservationBar } from "sections/search/mobile-reservation-bar"

export const ConfirmSection = () => {
  return (
    <Section className="mt-20">
      <div className="flex justify-between gap-x-4">
        <div className="flex flex-col flex-1">
          <TicketCards />
        </div>
        <div className="hidden w-1/4 md:block">
          <ReservationBar />
        </div>
        <MobileReservationBar />
      </div>
    </Section>
  )
}
