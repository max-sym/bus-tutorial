import create from "zustand"

export type StoreType = {
  isSidebarOpen: boolean
}

export const useUiStore = create<StoreType>(set => ({
  isSidebarOpen: false,
}))
