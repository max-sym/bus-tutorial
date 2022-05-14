import Prisma from "@prisma/client"
import { env, logger, mailjet, mailjetTemplates } from "../config"
import { reservationService } from "./reservation"

export type EmailToType = {
  name: string
  email: string
}

const sendEmail = async (message: any): Promise<any> => {
  return await mailjet.post("send", { version: "v3.1" }).request(message)
}

const sendReservationPdf = async ({
  to,
  reservationToken,
  passengerId,
  reservedTicketIds,
}: {
  to: EmailToType
  reservationToken: string
  passengerId: number
  reservedTicketIds: number[]
}) => {
  const links = reservedTicketIds.map(
    reservedTicketId =>
      `http://localhost:3000/v1/reservation/pdf/${reservationToken}/${passengerId}/${reservedTicketId}`
  )
  const message = {
    Messages: [
      {
        From: { Email: env.email.from, Name: env.email.fromName },
        To: [{ Email: to.email, Name: to.name }],
        TemplateID: mailjetTemplates.reservationComplete,
        TemplateLanguage: true,
        Variables: { name: to.name, pdf_links: links },
      },
    ],
  }
  return await sendEmail(message)
}

const sendVerificationEmail = async ({
  to,
  token,
}: {
  to: EmailToType
  token: string
}) => {
  const message = {
    Messages: [
      {
        From: { Email: env.email.from, Name: env.email.fromName },
        To: [{ Email: to.email, Name: to.name }],
        TemplateID: mailjetTemplates.userVerification,
        TemplateLanguage: true,
        Variables: {
          name: to.name,
          link: env.frontendUrl + "/verify-email?token=" + token,
        },
      },
    ],
  }
  return await sendEmail(message)
}

const sendResetPasswordEmail = async (to: Prisma.User, token: string) => {
  const message = {
    Messages: [
      {
        From: { Email: env.email.from, Name: env.email.fromName },
        To: [{ Email: to.email, Name: to.name }],
        TemplateID: mailjetTemplates.resetPassword,
        TemplateLanguage: true,
        Variables: {
          name: to.name,
          link: env.frontendUrl + "/reset-password?token=" + token,
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
  sendVerificationEmail,
  sendResetPasswordEmail,
}
