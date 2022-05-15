import React, { useEffect, useState } from "react"
import { Section } from "@bus/ui"
import { PassengerCards } from "./passenger-cards"
import { data } from "data"
import { ReservationBar } from "sections/search/reservation-bar"
import { MobileReservationBar } from "sections/search/mobile-reservation-bar"
import { useFormik } from "formik"
import { PassengerType, ReservationType } from "@bus/shared"
import { useStore } from "store"
import * as Yup from "yup"

export const ConfirmSectionCore = ({
  reservation,
}: {
  reservation: ReservationType
}) => {
  const setReservation = useStore(store => store.setReservation)

  const validationSchema = Yup.object().shape({
    passengers: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().min(1, "Too Short!").required("Required"),
        citizenId: Yup.string()
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
      })
    ),
  })

  const formik = useFormik({
    validationSchema,
    initialValues: {
      passengers: reservation.passengers.map(passenger => ({
        id: passenger.id,
        name: passenger.name || "",
        email: passenger.email || "",
        citizenId: passenger.citizenId || "",
      })),
    },
    onSubmit: async values => {
      await data.reservation
        .updatePassengers(reservation, values.passengers)
        .then(setReservation)
    },
  })

  const isButtonDisabled = !validationSchema.isValidSync({
    passengers: reservation.passengers,
  })

  return (
    <Section className="mt-20">
      <div className="flex justify-between gap-x-4">
        <div className="flex flex-col flex-1">
          <PassengerCards reservation={reservation} formik={formik} />
        </div>
        <div className="hidden w-1/4 md:block">
          <ReservationBar isCheckout isButtonDisabled={isButtonDisabled} />
        </div>
        <MobileReservationBar />
      </div>
    </Section>
  )
}

export const ConfirmSection = () => {
  const reservation = useStore(store => store.reservation)

  if (!reservation?.passengers) return null

  return <ConfirmSectionCore reservation={reservation} />
}
