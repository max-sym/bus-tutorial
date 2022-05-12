import { request } from "./request"
import { registerInitialValues } from "sections"

export const auth = {
  register: async (values: typeof registerInitialValues): Promise<any> => {
    const result = await request({
      url: "/auth/register",
      method: "POST",
      body: values,
    })
    return result
  },
}
