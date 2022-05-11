import { getLocalStorageItem, setLocalStorageItem } from "utils"
import create from "zustand"
export * from "./ui-store"

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
  departure: string
  arrival: string
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
  tickets: TicketType[]
}

export type TicketState = "CREATED" | "ONBOARDED"
export type TicketPersonType = "ADULT" | "CHILD" | "INFANT"

export type TicketType = {
  id: number
  name: string
  email: string
  citizenId: string
  personType: TicketPersonType
  state: TicketState
  reservedTrip: ReservedTripType
  reservedTripId: number
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
