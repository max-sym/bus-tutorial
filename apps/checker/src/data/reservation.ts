import { ReservationType } from "@bus/shared"
import { request } from "./request"

export const reservation = {
  getOne: async (token: string): Promise<ReservationType> => {
    const result = await request({
      url: `/reservation/${token}`,
      method: "GET",
      authenticated: true,
    })
    return result.response
  },
}
