import { request } from "./request"

export const city = {
  getMany: async (query: string) => {
    const result = await request({
      url: "/city/search",
      params: { query },
    })
    return result.response
  },
  getSome: async (cities: string[]) => {
    const result = await request({
      url: "/city/getSome",
      params: { cities: cities.join(",") },
    })
    return result.response
  },
}
