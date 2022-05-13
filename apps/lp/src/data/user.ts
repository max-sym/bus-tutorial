import { request } from "./request"

export const user = {
  updateData: async (body: { name: string }) => {
    const result = await request({
      url: "/user",
      method: "PATCH",
      authenticated: true,
      body,
    })
    return result
  },
}
