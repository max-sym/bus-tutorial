import { ReservationType, ReservedTripType, TripType } from "store"
import { request } from "./request"

export const reservation = {
  create: async (): Promise<any> => {
    const result = await request({
      url: "/reservation",
      method: "POST",
    })
    return result
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
    return result
  },
  deleteReservedTrip: async (
    reservation: ReservationType,
    reservedTrip: ReservedTripType
  ): Promise<any> => {
    const result = await request({
      url: `/reservation/${reservation.token}/${reservedTrip.id}`,
      method: "DELETE",
    })
    return result
  },
}
