import { request } from "./request"

export const trip = {
  getMany: async ({
    from,
    to,
    departureDate,
  }: {
    from: string
    to: string
    departureDate: string
  }) => {
    const result = await request({
      url: "/trip/search",
      params: { from, to, departureDate },
    })
    return result.response
  },
}
