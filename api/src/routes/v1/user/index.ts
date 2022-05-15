import { authRoute } from "./auth"
import { cityRoute } from "./city"
import { reservationRoute } from "./reservation"
import { tripRoute } from "./trip"
import { userRoute } from "./user"

export const userRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/city",
    route: cityRoute,
  },
  {
    path: "/trip",
    route: tripRoute,
  },
  {
    path: "/reservation",
    route: reservationRoute,
  },
]
