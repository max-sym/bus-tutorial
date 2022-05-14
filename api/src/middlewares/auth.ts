import passport from "passport"
import httpStatus from "http-status"
import Prisma from "prisma"
import { ApiError } from "../utils"
// import { roleRights } from "../config/roles"
// import { logger } from "../config"
import { Request, Response } from "express"

const verifyCallback =
  (req: Request, resolve, reject, _requiredRights) =>
  async (err, user: Prisma.User | false, info) => {
    if (err || info || !user) {
      return reject(
        new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
      )
    }
    req.user = user

    // if (requiredRights.length) {
    //   const userRights = roleRights.get(user.role)
    //   const hasRequiredRights = requiredRights.every(requiredRight =>
    //     userRights.includes(requiredRight)
    //   )
    //   if (!hasRequiredRights && req.params.userId !== user.id) {
    //     return reject(new ApiError(httpStatus.FORBIDDEN, "Forbidden"))
    //   }
    // }

    resolve()
  }

type AuthType = { isOptional?: boolean; requiredRights?: string[] }

export const auth =
  ({ isOptional, requiredRights }: AuthType = {}) =>
  async (req: Request, res: Response, next) => {
    return new Promise((resolve, reject) => {
      const authHeader = req.header("Authorization")
      if (isOptional && !authHeader) {
        return next()
      }

      const callback = verifyCallback(req, resolve, reject, requiredRights)
      passport.authenticate("jwt", { session: false }, callback)(req, res, next)
    })
      .then(() => next())
      .catch(err => next(err))
  }
