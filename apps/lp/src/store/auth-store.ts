import { getLocalStorageItem, setLocalStorageItem } from "utils"
import create from "zustand"

export type UserType = {
  id: number
  email: string
  name: string
}

export type TokenType = {
  expires: string
  token: string
}

export type UserTokensType = {
  access: TokenType
  refresh: TokenType
}

export type AuthStoreType = {
  user: UserType | null
  setUser: (value: UserType | null) => void
  userTokens: UserTokensType | null
  setUserTokens: (value: UserTokensType | null) => void
}

export const useAuthStore = create<AuthStoreType>(set => ({
  user: getLocalStorageItem("user"),
  setUser: value => {
    setLocalStorageItem("user", value)
    set(() => ({ user: value }))
  },
  userTokens: getLocalStorageItem("userTokens"),
  setUserTokens: value => {
    setLocalStorageItem("userTokens", value)
    set(() => ({ userTokens: value }))
  },
}))
