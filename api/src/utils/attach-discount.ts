import { env } from "../config"

export const attachDiscount = <T>(
  reservation: T & { userId: number }
): T & { discount?: number } => {
  return {
    ...reservation,
    discount: reservation.userId ? env.snipcartDiscountForUsers : undefined,
  }
}
