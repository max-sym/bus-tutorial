import express from "express"
import { env } from "../../config"
// import { docsRouter } from "./docs"
import { userRoutes } from "./user"
import { workerRoutes } from "./worker"

const router = express.Router()

const devRoutes = [
  // routes available only in development mode
  // {
  //   path: "/docs",
  //   route: docsRouter,
  // },
]

userRoutes.forEach(route => {
  router.use("/user" + route.path, route.route)
})

workerRoutes.forEach(route => {
  router.use("/worker" + route.path, route.route)
})

/* istanbul ignore next */
if (env.env === "development") {
  devRoutes.forEach(route => {
    router.use(route.path, route.route)
  })
}

export { router }
