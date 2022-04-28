import winston from "winston"
import { env } from "./env"

const enumerateErrorFormat = winston.format(info => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack })
  }
  return info
})

export const logger = winston.createLogger({
  level: env.env === "development" ? "debug" : "info",
  format: winston.format.combine(
    enumerateErrorFormat(),
    env.env === "development"
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"],
    }),
  ],
})
