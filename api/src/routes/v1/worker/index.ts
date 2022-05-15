import { reservationRoute } from "./reservation"
import { reservedTicketRoute } from "./reserved-ticket"

export const workerRoutes = [
  {
    path: "/reservation",
    route: reservationRoute,
  },
  {
    path: "/reserved-ticket",
    route: reservedTicketRoute,
  },
]
