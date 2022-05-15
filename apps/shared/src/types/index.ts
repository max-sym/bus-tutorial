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
  reservedTickets: ReservedTicketType[]
}

export type TicketState = "CREATED" | "ONBOARDED"

export type ReservedTicketType = {
  id: number
  state: TicketState
  reservedTrip: ReservedTripType
  reservedTripId: number
}

export type PassengerTypeType = "ADULT" | "CHILD" | "INFANT"
export type PassengerType = {
  id: number
  name: string
  email: string
  citizenId: string
  personType: PassengerTypeType
  reservedTickets: ReservedTicketType[]
  reservation: ReservationType
  reservationId: number
}

export type ReservationStateType = "CREATED" | "PAID" | "ONBOARDED"
export type ReservationType = {
  id: number
  token: string
  passengers: PassengerType[]
  reservedTrips: ReservedTripType[]
  state: ReservationStateType
  expiresAt: string
  createdAt: string
  updatedAt: string
  // A (separate from the reservation API model) value returned from API indicating a discount percentage.
  // Helpful to calculate and show price to user. Usually is returned as number if reservation has a user attached to it.
  discount?: number
}
