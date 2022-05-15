import { getLocalStorageItem, setLocalStorageItem } from "@bus/shared"
import create from "zustand"

export type WorkerType = {
  id: number
  email: string
  name: string
}

export type TokenType = {
  expires: string
  token: string
}

export type WorkerTokensType = {
  access: TokenType
  refresh: TokenType
}

export type AuthStoreType = {
  worker: WorkerType | null
  setWorker: (value: WorkerType | null) => void
  workerTokens: WorkerTokensType | null
  setWorkerTokens: (value: WorkerTokensType | null) => void
}

export const useAuthStore = create<AuthStoreType>(set => ({
  worker: getLocalStorageItem("worker"),
  setWorker: value => {
    setLocalStorageItem("worker", value)
    set(() => ({ worker: value }))
  },
  workerTokens: getLocalStorageItem("workerTokens"),
  setWorkerTokens: value => {
    setLocalStorageItem("workerTokens", value)
    set(() => ({ workerTokens: value }))
  },
}))
