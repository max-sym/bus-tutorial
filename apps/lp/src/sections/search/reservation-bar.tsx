import { Text, Card, CardHeading, CardTitle, CardContent } from "components"
import React from "react"

export const ReservationBar = () => (
  <Card className="sticky top-32">
    <CardHeading>
      <CardTitle>{"Reservation"}</CardTitle>
    </CardHeading>
    <CardContent>
      <Text color="gray-light">{"Please select a trip to proceed"}</Text>
    </CardContent>
  </Card>
)
