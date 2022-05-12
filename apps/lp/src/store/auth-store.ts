import { getLocalStorageItem, setLocalStorageItem } from "utils"
import create from "zustand"

export type UserType = {
  id: number
  email: string
  name: string
}

export type AuthStoreType = {
  user: UserType | null
  setUser: (value: UserType | null) => void
}

export const useAuthStore = create<AuthStoreType>(set => ({
  user: getLocalStorageItem("user"),
  setUser: value => {
    setLocalStorageItem("user", value)
    set(() => ({ user: value }))
  },
}))
