import { data } from "@/data"
import { useAuthStore } from "@/store"

const apiUrl = import.meta.env.VITE_API_URL + "/worker"

type MethodType = "GET" | "POST" | "PATCH" | "PUT" | "DELETE"
type RequestType = {
  url: string
  method?: MethodType
  params?: any
  authenticated?: boolean
  body?: {
    [key: string]: any
  }
}

const getUpToDateWorkerTokens = async () => {
  const state = useAuthStore.getState()
  const workerTokens = state.workerTokens
  if (!workerTokens) return null

  const accessTokenExpiration = new Date(workerTokens.access.expires).getTime()
  const now = new Date().getTime()

  if (accessTokenExpiration - now > 0) return workerTokens

  const result = await data.auth.refreshTokens()

  state.setWorkerTokens(result.response)
  return result.response
}

type RequestResponseType = {
  response: any
  status: number
}

export const request = async ({
  url,
  method = "GET",
  params,
  authenticated = false,
  body,
}: RequestType): Promise<RequestResponseType> => {
  return new Promise(async (resolve, reject) => {
    const workerTokens = authenticated ? await getUpToDateWorkerTokens() : null

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (authenticated && workerTokens) {
      headers.Authorization = `JWT ${workerTokens.access.token}`
    }

    const route = params
      ? `${url}?${new URLSearchParams(params).toString()}`
      : url

    const endpoint = apiUrl + route

    await fetch(endpoint, {
      method,
      headers,
      body: JSON.stringify(body),
    })
      .then(async response => {
        const result = {
          // 204 would not return any content so response.json gets stuck here if we don't perform this check.
          // https://github.com/whatwg/fetch/issues/113
          response: response.status === 204 ? null : await response.json(),
          status: response.status,
        }
        resolve(result)
      })
      .catch(error => {
        console.error(error)
      })
  })
}
