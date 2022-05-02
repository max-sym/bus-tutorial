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

export const request = async ({
  url,
  method = "GET",
  params,
  body,
}: RequestType) => {
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
        const result = await response.json()
        resolve(result)
      })
      .catch(error => {
        // catch error
      })
  })
}
