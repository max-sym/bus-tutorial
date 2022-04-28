import { request } from "./request"

export const city = {
  getMany: async (query: string): Promise<any> => {
    const result = await request({
      url: "/city/search",
      params: { query },
    })
    return result
  },
}
