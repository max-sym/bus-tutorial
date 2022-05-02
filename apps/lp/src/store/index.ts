import { getLocalStorageItem, setLocalStorageItem } from "utils"
import create from "zustand"

export type City = {
  id: number
  name: string
  slug: string
}

export type Bus = {
  id: number
  name: string
  seats: number
}

export type TripType = {
  id: number
  cityFrom: City
  cityTo: City
  departure: Date
  arrival: Date
  distance: number
  price: number
  bus: Bus
}

export type ReservedTripType = {
  id: number
  trip: TripType
  tripId: number
  reservationId: number
  reservation: ReservationType
}

export type ReservationStateType = "CREATED" | "PAID" | "ONBOARDED"

export type ReservationType = {
  id: number
  token: string
  reservedTrips: ReservedTripType[]
  state: ReservationStateType
  expiresAt: string
  createdAt: string
  updatedAt: string
}

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
