import { env, logger, mailjet, mailjetTemplates } from "../config"

const sendEmail = async (message: any): Promise<any> => {
  return await mailjet.post("send", { version: "v3.1" }).request(message)
}

const reservationPdf = async ({ to, reservationToken }) => {
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
          pdf_link: `http://localhost:3000/v1/reservation/pdf/${reservationToken}`,
        },
      },
    ],
  }
  return await sendEmail(message)
}

export const emailService = {
  sendEmail,
  reservationPdf,
}
