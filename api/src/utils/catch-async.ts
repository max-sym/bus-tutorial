import { Response } from "express"
import { Request } from "../types"

type FnType = (req: Request, res: Response, next?: any) => void

export const catchAsync =
  (fn: FnType) => (req: Request, res: Response, next) => {
    Promise.resolve(fn(req, res, next)).catch(err => next(err))
  }
