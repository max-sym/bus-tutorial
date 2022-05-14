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
  changePassword: async (body: {
    password: string
    confirmPassword: string
  }) => {
    const result = await request({
      url: "/user/change-password",
      method: "PATCH",
      authenticated: true,
      body,
    })
    return result
  },
  deleteAccount: async () => {
    const result = await request({
      url: "/user/delete-account",
      method: "POST",
      authenticated: true,
    })
    return result
  },
}
