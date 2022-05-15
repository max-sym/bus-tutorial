import { request } from "./request"

export const reservedTicket = {
  confirm: async (id: number) => {
    const result = await request({
      url: `/reserved-ticket/${id}/confirm`,
      method: "PATCH",
      authenticated: true,
    })
    return result
  },
}
