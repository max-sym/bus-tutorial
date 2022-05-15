import express from "express"
import helmet from "helmet"
import xss from "xss-clean"
import compression from "compression"
import cors from "cors"
import passport from "passport"
import httpStatus from "http-status"
import { env, morganConfig, passportConfig } from "./config"
import { authLimiter } from "./middlewares/rate-limiter"
import { router } from "./routes/v1"
import { errorConverter, errorHandler } from "./middlewares"
import { ApiError } from "./utils"

const app = express()

if (env.env !== "test") {
  app.use(morganConfig.successHandler)
  app.use(morganConfig.errorHandler)
}

// set security HTTP headers
app.use(helmet())

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// sanitize request data
app.use(xss())

// gzip compression
app.use(compression())

// enable cors
app.use(cors({ origin: env.cors.split(",") }))

// jwt authentication
app.use(passport.initialize())
passport.use("jwt", passportConfig.jwtStrategy)

passport.serializeUser((user, done) => {
  done(null, user)
})

// limit repeated failed requests to auth endpoints
if (env.env === "production") {
  app.use("/v1/auth", authLimiter)
}

// v1 api routes
app.use("/v1", router)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"))
})

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)

export { app }
