import { ReservationType } from "@bus/shared"
import { getLocalStorageItem, setLocalStorageItem } from "@bus/shared"
import create from "zustand"
export * from "./ui-store"
export * from "./auth-store"

export type StoreType = {
  reservation: ReservationType | null
  setReservation: (value: ReservationType | null) => void
  reservationTimeLeft: number | null
}

export const useStore = create<StoreType>(set => ({
  reservation: getLocalStorageItem("reservation"),
  setReservation: value => {
    setLocalStorageItem("reservation", value)
    set(() => ({ reservation: value }))
  },
  reservationTimeLeft: null,
}))
