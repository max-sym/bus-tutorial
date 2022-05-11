import Prisma from "@prisma/client"
import { env, logger, mailjet, mailjetTemplates } from "../config"
import { reservationService } from "./reservation"

const sendEmail = async (message: any): Promise<any> => {
  return await mailjet.post("send", { version: "v3.1" }).request(message)
}

const sendReservationPdf = async ({
  to,
  reservationToken,

  passengerId,
  reservedTicketIds,
}: {
  to: {
    name: string
    email: string
  }
  reservationToken: string

  passengerId: number
  reservedTicketIds: number[]
}) => {
  const message = {
    Messages: [
      {
        From: {
          Email: "info@vitelearning.com",
          Name: "The Private Bus Company",
        },
        To: [
          {
            Email: to.email,
            Name: to.name,
          },
        ],
        TemplateID: mailjetTemplates.reservationComplete,
        TemplateLanguage: true,
        Variables: {
          name: to.name,
          pdf_links: reservedTicketIds.map(
            reservedTicketId =>
              `http://localhost:3000/v1/reservation/pdf/${reservationToken}/${passengerId}/${reservedTicketId}`
          ),
        },
      },
    ],
  }
  return await sendEmail(message)
}

const sendReservationPdfs = async (
  reservation: Awaited<ReturnType<typeof reservationService["update"]>>
) => {
  const promises = reservation.passengers.map(async passenger => {
    return await sendReservationPdf({
      to: {
        name: passenger.name,
        email: passenger.email,
      },
      reservationToken: reservation.token,
      reservedTicketIds: passenger.reservedTickets.map(r => r.id),
      passengerId: passenger.id,
    })
  })
  return await Promise.all(promises)
}

export const emailService = {
  sendEmail,
  sendReservationPdfs,
}
