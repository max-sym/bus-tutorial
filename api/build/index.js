var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

// src/app.ts
var import_express2 = __toESM(require("../node_modules/express/index.js"));
var import_helmet = __toESM(require("../node_modules/helmet/dist/index.js"));
var import_xss_clean = __toESM(require("../node_modules/xss-clean/lib/index.js"));
var import_compression = __toESM(require("../node_modules/compression/index.js"));
var import_cors = __toESM(require("../node_modules/cors/lib/index.js"));
var import_http_status3 = __toESM(require("../node_modules/http-status/lib/index.js"));

// src/config/env.ts
var import_dotenv = __toESM(require("../node_modules/dotenv/lib/main.js"));
var import_path = __toESM(require("path"));
var import_joi = __toESM(require("../node_modules/joi/lib/index.js"));
import_dotenv.default.config({ path: import_path.default.join(__dirname, "../../.env") });
var envVarsSchema = import_joi.default.object().keys({
  NODE_ENV: import_joi.default.string().valid("production", "development", "test").required(),
  PORT: import_joi.default.number().default(3e3),
  JWT_SECRET: import_joi.default.string().required().description("JWT secret key"),
  JWT_ACCESS_EXPIRATION_MINUTES: import_joi.default.number().default(30).description("minutes after which access tokens expire"),
  JWT_REFRESH_EXPIRATION_DAYS: import_joi.default.number().default(30).description("days after which refresh tokens expire"),
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES: import_joi.default.number().default(10).description("minutes after which reset password token expires"),
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: import_joi.default.number().default(10).description("minutes after which verify email token expires"),
  SMTP_HOST: import_joi.default.string().description("server that will send the emails"),
  SMTP_PORT: import_joi.default.number().description("port to connect to the email server"),
  SMTP_USERNAME: import_joi.default.string().description("username for email server"),
  SMTP_PASSWORD: import_joi.default.string().description("password for email server"),
  EMAIL_FROM: import_joi.default.string().description("the from field in the emails sent by the app")
}).unknown();
var { value: envVars, error } = envVarsSchema.prefs({ errors: { label: "key" } }).validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
var env = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD
      }
    },
    from: envVars.EMAIL_FROM
  }
};

// src/config/logger.ts
var import_winston = __toESM(require("../node_modules/winston/lib/winston.js"));
var enumerateErrorFormat = import_winston.default.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});
var logger = import_winston.default.createLogger({
  level: env.env === "development" ? "debug" : "info",
  format: import_winston.default.format.combine(enumerateErrorFormat(), env.env === "development" ? import_winston.default.format.colorize() : import_winston.default.format.uncolorize(), import_winston.default.format.splat(), import_winston.default.format.printf(({ level, message }) => `${level}: ${message}`)),
  transports: [
    new import_winston.default.transports.Console({
      stderrLevels: ["error"]
    })
  ]
});

// src/config/morgan.ts
var import_morgan = __toESM(require("../node_modules/morgan/index.js"));
import_morgan.default.token("message", (req, res) => res.locals.errorMessage || "");
var getIpFormat = () => env.env === "production" ? ":remote-addr - " : "";
var successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
var errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;
var successHandler = (0, import_morgan.default)(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) }
});
var errorHandler = (0, import_morgan.default)(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) }
});
var morganConfig = {
  successHandler,
  errorHandler
};

// src/config/prisma.ts
var import_client = require("../node_modules/@prisma/client/index.js");
var prisma = new import_client.PrismaClient();

// src/middlewares/rate-limiter.ts
var import_express_rate_limit = __toESM(require("../node_modules/express-rate-limit/lib/express-rate-limit.js"));
var authLimiter = (0, import_express_rate_limit.default)({
  windowMs: 15 * 60 * 1e3,
  max: 20,
  skipSuccessfulRequests: true
});

// src/routes/v1/index.ts
var import_express = __toESM(require("../node_modules/express/index.js"));

// src/middlewares/error.ts
var import_http_status = __toESM(require("../node_modules/http-status/lib/index.js"));

// src/utils/api-error.ts
var ApiError = class extends Error {
  constructor(statusCode, message, isOperational = true, stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};

// src/utils/pick.ts
var pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

// src/utils/catch-async.ts
var catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

// src/middlewares/error.ts
var errorConverter = (err, req, res, next) => {
  let error2 = err;
  if (!(error2 instanceof ApiError)) {
    const statusCode = error2.statusCode ? import_http_status.default.BAD_REQUEST : import_http_status.default.INTERNAL_SERVER_ERROR;
    const message = error2.message || import_http_status.default[statusCode];
    error2 = new ApiError(statusCode, message, false, err.stack);
  }
  next(error2);
};
var errorHandler2 = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (env.env === "production" && !err.isOperational) {
    statusCode = import_http_status.default.INTERNAL_SERVER_ERROR;
    message = import_http_status.default[import_http_status.default.INTERNAL_SERVER_ERROR];
  }
  res.locals.errorMessage = err.message;
  const response = {
    code: statusCode,
    message,
    ...env.env === "development" && { stack: err.stack }
  };
  if (env.env === "development") {
    logger.error(err);
  }
  res.status(statusCode).send(response);
};

// src/middlewares/validate.ts
var import_joi2 = __toESM(require("../node_modules/joi/lib/index.js"));
var import_http_status2 = __toESM(require("../node_modules/http-status/lib/index.js"));
var validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error: error2 } = import_joi2.default.compile(validSchema).prefs({ errors: { label: "key" }, abortEarly: false }).validate(object);
  if (error2) {
    const errorMessage = error2.details.map((details) => details.message).join(", ");
    return next(new ApiError(import_http_status2.default.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

// src/services/city.ts
var getMany = async (query) => {
  return await prisma.city.findMany({
    where: {
      slug: { contains: query }
    }
  });
};
var getSome = async (cities) => {
  return await prisma.city.findMany({
    where: {
      slug: { in: cities.split(",") }
    }
  });
};
var cityService = {
  getMany,
  getSome
};

// src/services/trip.ts
var import_moment = __toESM(require("../node_modules/moment/moment.js"));
var getMany2 = async (filter) => {
  const dateFrom = (0, import_moment.default)(filter.departureDate, "DD-MM-YYYY");
  const result = await prisma.trip.findMany({
    include: {
      cityFrom: true,
      cityTo: true,
      bus: true
    },
    where: {
      cityFrom: { is: { slug: filter.from } },
      cityTo: { is: { slug: filter.to } },
      departure: { gte: dateFrom.toDate(), lt: dateFrom.endOf("day").toDate() }
    }
  });
  return result;
};
var tripService = {
  getMany: getMany2
};

// src/controllers/city.ts
var getMany3 = catchAsync(async (req, res) => {
  const result = await cityService.getMany(req.query.query);
  res.send(result);
});
var getSome2 = catchAsync(async (req, res) => {
  const result = await cityService.getSome(req.query.cities);
  res.send(result);
});
var cityController = {
  getMany: getMany3,
  getSome: getSome2
};

// src/controllers/trip.ts
var getMany4 = catchAsync(async (req, res) => {
  const result = await tripService.getMany(pick(req.query, ["from", "to", "departureDate"]));
  res.send(result);
});
var tripController = {
  getMany: getMany4
};

// src/validations/city.ts
var import_joi3 = __toESM(require("../node_modules/joi/lib/index.js"));
var getMany5 = {
  query: import_joi3.default.object().keys({
    query: import_joi3.default.string().required().min(1)
  })
};
var getSome3 = {
  query: import_joi3.default.object().keys({
    cities: import_joi3.default.string().required().min(1)
  })
};
var cityValidation = {
  getMany: getMany5,
  getSome: getSome3
};

// src/validations/trip.ts
var import_joi4 = __toESM(require("../node_modules/joi/lib/index.js"));
var getMany6 = {
  query: import_joi4.default.object().keys({
    from: import_joi4.default.string().required().min(1),
    to: import_joi4.default.string().required().min(1),
    departureDate: import_joi4.default.string().required().min(1)
  })
};
var tripValidation = {
  getMany: getMany6
};

// src/routes/v1/city.ts
var express = require("../node_modules/express/index.js");
var cityRoute = express.Router();
cityRoute.get("/search", validate(cityValidation.getMany), cityController.getMany);
cityRoute.get("/getSome", validate(cityValidation.getSome), cityController.getSome);

// src/routes/v1/trip.ts
var express2 = require("../node_modules/express/index.js");
var tripRoute = express2.Router();
tripRoute.get("/search", validate(tripValidation.getMany), tripController.getMany);

// src/routes/v1/index.ts
var router = import_express.default.Router();
var defaultRoutes = [
  {
    path: "/city",
    route: cityRoute
  },
  {
    path: "/trip",
    route: tripRoute
  }
];
var devRoutes = [];
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
if (env.env === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

// src/app.ts
var app = (0, import_express2.default)();
if (env.env !== "test") {
  app.use(morganConfig.successHandler);
  app.use(morganConfig.errorHandler);
}
app.use((0, import_helmet.default)());
app.use(import_express2.default.json());
app.use(import_express2.default.urlencoded({ extended: true }));
app.use((0, import_xss_clean.default)());
app.use((0, import_compression.default)());
app.use((0, import_cors.default)());
app.options("*", (0, import_cors.default)());
if (env.env === "production") {
  app.use("/v1/auth", authLimiter);
}
app.use("/v1", router);
app.use((req, res, next) => {
  next(new ApiError(import_http_status3.default.NOT_FOUND, "Not found"));
});
app.use(errorConverter);
app.use(errorHandler2);

// src/index.ts
var server;
server = app.listen(env.port, () => {
  logger.info(`Listening to port ${env.port}`);
});
var exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};
var unexpectedErrorHandler = (error2) => {
  logger.error(error2);
  exitHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
