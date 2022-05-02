import moment from "moment"

export const getFormattedTimeLeft = reservationTimeLeft =>
  moment(reservationTimeLeft).format("mm:ss")
