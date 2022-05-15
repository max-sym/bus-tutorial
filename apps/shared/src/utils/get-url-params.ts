export const getUrlParams = () => {
  if (typeof window === "undefined") return null

  return new URLSearchParams(window.location.search)
}
