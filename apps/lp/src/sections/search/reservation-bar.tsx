import {
  Text,
  Card,
  CardHeading,
  CardTitle,
  CardContent,
  CardFooter,
} from "components"
import React from "react"
import { useStore } from "store"
import { ReservationContent } from "./reservation-content"
import { ReservationFooter } from "./reservation-footer"

export const ReservationBar = ({
  isCheckout,
  isButtonDisabled,
}: {
  isCheckout?: boolean
  isButtonDisabled?: boolean
}) => {
  const reservation = useStore(store => store.reservation)
  const hasReservedTrips = !!reservation?.reservedTrips?.length

  return (
    <Card className="sticky top-32">
      <CardHeading>
        <CardTitle>{"Reservation"}</CardTitle>
      </CardHeading>
      <CardContent className="max-h-[500px] overflow-y-auto">
        {hasReservedTrips ? (
          <ReservationContent reservation={reservation} />
        ) : (
          <Text color="gray-light">{"Please select a trip to proceed"}</Text>
        )}
      </CardContent>
      {hasReservedTrips && (
        <CardFooter>
          <ReservationFooter
            reservation={reservation}
            isCheckout={isCheckout}
            isButtonDisabled={isButtonDisabled}
          />
        </CardFooter>
      )}
    </Card>
  )
}
