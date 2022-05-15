import Prisma from "@prisma/client"
import moment from "moment"
import { env, prisma } from "../../config"
import { ApiError, attachDiscount, getPrice, uid } from "../../utils"

const confirm = async (id: number) => {
  const reservedTicket = await prisma.reservedTicket.update({
    data: {
      state: "ONBOARDED",
    },
    where: { id },
  })

  return reservedTicket
}

export const reservedTicket = {
  confirm,
}
