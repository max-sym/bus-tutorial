import PDFDocument from "pdfkit"
import QRCode from "qrcode"
import { Response } from "express"

const pageOptions = {
  size: "A7",
  margins: {
    top: 20,
    bottom: 20,
    left: 10,
    right: 10,
  },
}

const generate = async ({
  reservation,
  res,
  reservedTicketId,
  passengerId,
}: {
  reservation: any
  res: Response
  reservedTicketId: number
  passengerId: number
}) => {
  const doc = new PDFDocument(pageOptions)
  res.set("Content-Type", "application/pdf")

  doc.pipe(res)

  const code = reservation.token + ":" + reservedTicketId + ":" + passengerId

  const qr = await QRCode.toDataURL(code)

  doc.fillColor("#000")

  doc.image(qr, 0, 20, { width: 100, height: 100 })

  doc.font("Helvetica-Bold", 12).text("RESERVATION", 12, 15)

  doc.end()
}

export const reservationPdf = {
  generate,
}
