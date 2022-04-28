import { cities } from "sections/home/booking-form/cities"

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

export const busses = [
  {
    id: 1,
    name: "Standard Bus",
    seats: 32,
  },
  {
    id: 2,
    name: "Luxury Bus",
    seats: 14,
  },
]

export const trips: TripType[] = []
