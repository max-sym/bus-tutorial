import { Text, Card, CardHeading, CardTitle, CardContent } from "components"
import React from "react"
import { useStore } from "store"
import { ReservationContent } from "./reservation-content"

export const ReservationBar = () => {
  const reservation = useStore(store => store.reservation)
  const hasReservedTrips = !!reservation?.reservedTrips?.length

  return (
    <Card className="sticky top-32">
      <CardHeading>
        <CardTitle>{"Reservation"}</CardTitle>
      </CardHeading>
      <CardContent>
        {hasReservedTrips ? (
          <ReservationContent reservation={reservation} />
        ) : (
          <Text color="gray-light">{"Please select a trip to proceed"}</Text>
        )}
      </CardContent>
    </Card>
  )
}
