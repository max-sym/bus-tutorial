import {
  ReservationType,
  ReservedTripType,
  TripType,
  PassengerType,
} from "store"
import { request } from "./request"
import { RequestedTripType } from "sections/search/use-get-requested-trip"

export const reservation = {
  create: async (requestedTrip: RequestedTripType): Promise<any> => {
    const result = await request({
      url: "/reservation",
      method: "POST",
      body: {
        guests: requestedTrip.guests,
      },
    })
    return result.response
  },
  addReservedTrip: async (
    reservation: ReservationType,
    trip: TripType
  ): Promise<any> => {
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
  ): Promise<any> => {
    const result = await request({
      url: `/reservation/${reservation.token}/${reservedTrip.id}`,
      method: "DELETE",
    })
    return result.response
  },
  deleteOne: async (reservation: ReservationType): Promise<any> => {
    const result = await request({
      url: `/reservation/${reservation.token}`,
      method: "DELETE",
    })
    return result.response
  },
  getInSnipcartFormat: async (reservation: ReservationType): Promise<any> => {
    const result = await request({
      url: `/reservation/${reservation.token}/snipcart-format`,
      method: "GET",
    })
    return result.response
  },
  updatePassengers: async (
    reservation: ReservationType,
    passengers: Partial<PassengerType>[]
  ): Promise<any> => {
    const result = await request({
      url: `/reservation/${reservation.token}/passengers`,
      method: "PATCH",
      body: { passengers },
    })
    return result.response
  },
}
