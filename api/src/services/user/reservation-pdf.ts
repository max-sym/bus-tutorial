import moment from "moment"
import PDFDocument from "pdfkit"
import QRCode from "qrcode"
import { Response } from "express"
import { reservation as reservationService } from "./reservation"
import Prisma from "@prisma/client"

const pageOptions = {
  size: "A7",
  margins: {
    top: 20,
    bottom: 20,
    left: 10,
    right: 10,
  },
}

type AwaitedReservation = Awaited<
  ReturnType<typeof reservationService["getOne"]>
>

const generate = async ({
  reservation,
  res,
  reservedTicket,
  passenger,
  reservedTrip,
}: {
  reservation: AwaitedReservation
  res: Response
  reservedTicket: AwaitedReservation["passengers"][number]["reservedTickets"][number]
  passenger: AwaitedReservation["passengers"][number]
  reservedTrip: AwaitedReservation["reservedTrips"][number]
}) => {
  const doc = new PDFDocument(pageOptions)
  res.set("Content-Type", "application/pdf")

  doc.pipe(res)

  const code = reservation.token + ":" + reservedTicket.id + ":" + passenger.id

  const qr = await QRCode.toDataURL(code)

  doc.fillColor("#000")

  doc.image(qr, 0, 20, { width: 100, height: 100 })

  doc.font("Helvetica-Bold", 12).text("Bus Ticket", 12, 15)

  doc
    .font("Times-Bold", 9)
    .text("ID: " + code, 12, 120)
    .text("Bus: " + reservedTrip.trip.bus.name)
    .text("From: " + reservedTrip.trip.cityFrom.name)
    .text("To: " + reservedTrip.trip.cityTo.name)
    .text("Departure: " + moment(reservedTrip.trip.departure).format("LT L"))
    .text("Arrival: " + moment(reservedTrip.trip.arrival).format("LT L"))

  doc.moveTo(12, 210).lineTo(190, 210).stroke()

  doc
    .moveDown()
    .moveDown()
    .moveDown()
    .moveDown()
    .font("Helvetica-Bold", 12)
    .text("The Private Bus Company")
    .font("Helvetica", 8)
    .text("www.bus-ticket-booking-website-example.com")

  doc.end()
}

export const reservationPdf = {
  generate,
}
