const apiUrl = process.env.GATSBY_API_URL

type MethodType = "GET" | "POST" | "PATCH" | "PUT" | "DELETE"
type RequestType = {
  url: string
  method?: MethodType
  params?: any
  body?: {
    [key: string]: any
  }
}

type RequestResponseType = {
  response: any
  status: number
}

export const request = async ({
  url,
  method = "GET",
  params,
  body,
}: RequestType): Promise<RequestResponseType> => {
  return new Promise(async (resolve, reject) => {
    const route = params
      ? `${url}?${new URLSearchParams(params).toString()}`
      : url

    const endpoint = apiUrl + route

    await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
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
