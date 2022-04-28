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
  }): Promise<any> => {
    const result = await request({
      url: "/trip/search",
      params: { from, to, departureDate },
    })
    return result
  },
}
