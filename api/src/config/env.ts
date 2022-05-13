import dotenv from "dotenv"
import path from "path"
import Joi from "joi"

dotenv.config({ path: path.join(__dirname, "../../.env") })

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(3000),
    CORS: Joi.string(),
    SNIPCART_API_URL: Joi.string(),
    SNIPCART_DISCOUNT_FOR_USERS: Joi.number(),
    CURRENT_URL: Joi.string(),
    FRONTEND_URL: Joi.string(),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description("days after which refresh tokens expire"),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description("minutes after which reset password token expires"),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description("minutes after which verify email token expires"),
    SMTP_HOST: Joi.string().description("server that will send the emails"),
    SMTP_PORT: Joi.number().description("port to connect to the email server"),
    SMTP_USERNAME: Joi.string().description("username for email server"),
    SMTP_PASSWORD: Joi.string().description("password for email server"),
    EMAIL_FROM: Joi.string().description(
      "the from field in the emails sent by the app"
    ),
    EMAIL_FROM_NAME: Joi.string().description(
      "the from field in the emails sent by the app"
    ),
  })
  .unknown()

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

export const env = {
  env: envVars.NODE_ENV,
  cors: envVars.CORS,
  port: envVars.PORT,
  snipcartApiUrl: envVars.SNIPCART_API_URL,
  snipcartDiscountForUsers: envVars.SNIPCART_DISCOUNT_FOR_USERS,
  currentUrl: envVars.CURRENT_URL,
  frontendUrl: envVars.FRONTEND_URL,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:
      envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
    fromName: envVars.EMAIL_FROM_NAME,
  },
}
