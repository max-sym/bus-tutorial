import React from "react"
import { Seo } from "components"
import { ReservationSection } from "sections"

const ReservationsPage = ({ token }: { token: string }) => (
  <>
    <Seo title={`Reservation ${token}`} />
    <ReservationSection token={token} />
  </>
)

export default ReservationsPage
