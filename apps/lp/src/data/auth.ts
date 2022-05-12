import { request } from "./request"
import { registerInitialValues } from "sections"
import { useAuthStore } from "store"

export const auth = {
  register: async (values: typeof registerInitialValues): Promise<any> => {
    const result = await request({
      url: "/auth/register",
      method: "POST",
      body: values,
    })
    return result
  },
  logout: async (): Promise<any> => {
    const userTokens = useAuthStore.getState().userTokens

    const result = await request({
      url: "/auth/logout",
      method: "POST",
      body: { refreshToken: userTokens?.refresh.token },
    })
    return result
  },
}
