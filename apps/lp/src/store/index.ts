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
  tripId: TripType
  reservationId: number
  reservation: ReservationType
}

export type ReservationStateType = "CREATED" | "PAID" | "ONBOARDED"

export type ReservationType = {
  id: number
  token: string
  reservedTrips: ReservedTripType[]
  state: ReservationStateType
  createdAt: string
  updatedAt: string
}

export type StoreType = {
  reservation: ReservationType | null
}

export const useStore = create<StoreType>(set => ({
  reservation: null,
}))
