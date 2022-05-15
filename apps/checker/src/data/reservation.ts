import {
  ReservationType,
  ReservedTripType,
  TripType,
  PassengerType,
} from "@bus/shared"
import { request } from "./request"

export const reservation = {
  getOne: async (token: string) => {
    const result = await request({
      url: `/reservation/${token}`,
      method: "GET",
      authenticated: true,
    })
    return result.response
  },
}
