const express = require("express")
import authRoute from "./auth.route"
import userRoute from "./user.route"
import docsRoute from "./docs.route"
import config from "../../config/env"

const router = express.Router()

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
]

const devRoutes = [
  // routes available only in development mode
  {
    path: "/docs",
    route: docsRoute,
  },
]

defaultRoutes.forEach(route => {
  router.use(route.path, route.route)
})

/* istanbul ignore next */
if (config.env === "development") {
  devRoutes.forEach(route => {
    router.use(route.path, route.route)
  })
}

export { router }
