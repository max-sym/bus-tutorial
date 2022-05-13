import {
  ReservationType,
  ReservedTripType,
  TripType,
  PassengerType,
  useAuthStore,
} from "store"
import { request } from "./request"
import { RequestedTripType } from "sections/search/use-get-requested-trip"

export const reservation = {
  create: async (requestedTrip: RequestedTripType) => {
    const user = useAuthStore.getState().user

    const result = await request({
      url: "/reservation",
      method: "POST",
      authenticated: !!user,
      body: {
        guests: requestedTrip.guests,
      },
    })
    return result.response
  },
  addReservedTrip: async (reservation: ReservationType, trip: TripType) => {
    const result = await request({
      url: `/reservation/${reservation.token}`,
      method: "PATCH",
      body: {
        tripId: trip.id,
      },
    })
    return result.response
  },
  deleteReservedTrip: async (
    reservation: ReservationType,
    reservedTrip: ReservedTripType
  ) => {
    const result = await request({
      url: `/reservation/${reservation.token}/${reservedTrip.id}`,
      method: "DELETE",
    })
    return result.response
  },
  deleteOne: async (reservation: ReservationType) => {
    const result = await request({
      url: `/reservation/${reservation.token}`,
      method: "DELETE",
    })
    return result.response
  },
  getInSnipcartFormat: async (reservation: ReservationType) => {
    const result = await request({
      url: `/reservation/${reservation.token}/snipcart-format`,
      method: "GET",
    })
    return result.response
  },
  updatePassengers: async (
    reservation: ReservationType,
    passengers: Partial<PassengerType>[]
  ) => {
    const result = await request({
      url: `/reservation/${reservation.token}/passengers`,
      method: "PATCH",
      body: { passengers },
    })
    return result.response
  },
}
