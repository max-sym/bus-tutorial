export const request = async ({ url, method = "GET", params }) => {
  return new Promise(async (resolve, reject) => {
    const endpoint =
      "http://localhost:3000/v1" +
      url +
      "?" +
      new URLSearchParams(params).toString()

    await fetch(endpoint, {
      method,
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
