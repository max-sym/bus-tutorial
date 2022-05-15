const isWindowDefined = typeof window !== "undefined"

export const getLocalStorageItem = (key: string) =>
  isWindowDefined ? JSON.parse(localStorage.getItem(key) || "null") : null

export const setLocalStorageItem = (key: string, value: any) =>
  isWindowDefined
    ? localStorage.setItem(key, JSON.stringify(value || null))
    : null
