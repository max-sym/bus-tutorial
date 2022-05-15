import { reservationRoute } from "./reservation"
import { reservedTicketRoute } from "./reserved-ticket"
import { authRoute } from "./auth"

export const workerRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/reservation",
    route: reservationRoute,
  },
  {
    path: "/reserved-ticket",
    route: reservedTicketRoute,
  },
]
