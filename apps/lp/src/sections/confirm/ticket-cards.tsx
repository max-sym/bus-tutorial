import React from "react"
import { Card } from "components"

const TicketCard = () => <Card>asd</Card>

export const TicketCards = () => {
  const tickets = [{ id: 1 }]

  return (
    <div className="mt-4 space-y-4">
      {tickets.map(trip => (
        <TicketCard key={tickets.id} />
      ))}
    </div>
  )
}
