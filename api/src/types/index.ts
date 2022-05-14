import Prisma from "@prisma/client"
import { Request as ExpressRequest } from "express"

export interface Request extends ExpressRequest {
  user?: Prisma.User
}
