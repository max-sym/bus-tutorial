import Mailjet from "node-mailjet"

export const mailjetTemplates = {
  reservationComplete: 3925092,
  userVerification: 3931424,
}

export const mailjet = Mailjet.connect(
  process.env.MAILJET_API_PUBLIC_KEY,
  process.env.MAILJET_API_SECRET_KEY
)
