import React from "react"
import { Section } from "components"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { ReservationBar } from "./reservation-bar"
import { Trips } from "./trips"

export const SearchSection = () => {
  return (
    <Section className="mt-20">
      <div className="flex justify-between gap-x-4">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1">
          <Header />
          <Trips />
        </div>
        <div className="w-1/4">
          <ReservationBar />
        </div>
      </div>
    </Section>
  )
}
