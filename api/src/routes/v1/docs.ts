const express = require("express")
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import { swaggerDef } from "../../docs/swaggerDef"

export const docsRouter = express.Router()

const specs = swaggerJsdoc({
  swaggerDef,
  apis: ["src/docs/*.yml", "src/routes/v1/*.js"],
})

docsRouter.use("/", swaggerUi.serve)
docsRouter.get(
  "/",
  swaggerUi.setup(specs, {
    explorer: true,
  })
)
