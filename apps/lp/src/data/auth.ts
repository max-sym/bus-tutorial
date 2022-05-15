import { request } from "./request"
import { registerInitialValues, loginInitialValues } from "sections"
import { useAuthStore } from "store"

export const auth = {
  register: async (values: typeof registerInitialValues) => {
    const result = await request({
      url: "/auth/register",
      method: "POST",
      body: values,
    })
    return result
  },
  logout: async () => {
    const userTokens = useAuthStore.getState().userTokens

    const result = await request({
      url: "/auth/logout",
      method: "POST",
      body: { refreshToken: userTokens?.refresh.token },
    })
    return result
  },
  login: async (values: typeof loginInitialValues) => {
    const result = await request({
      url: "/auth/login",
      method: "POST",
      body: values,
    })
    return result
  },
  refreshTokens: async () => {
    const userTokens = useAuthStore.getState().userTokens

    const result = await request({
      url: "/auth/refresh-tokens",
      method: "POST",
      body: { refreshToken: userTokens?.refresh.token },
    })
    return result
  },
  verifyEmail: async (token: string) => {
    const result = await request({
      url: "/auth/verify-email",
      method: "POST",
      params: { token },
    })
    return result
  },
  requestPasswordReset: async (body: { email: string }) => {
    const result = await request({
      url: "/auth/request-password-reset",
      method: "POST",
      body,
    })
    return result
  },
  resetPassword: async (body: { token: string; password: string }) => {
    const result = await request({
      url: "/auth/reset-password",
      method: "POST",
      body,
    })
    return result
  },
}
