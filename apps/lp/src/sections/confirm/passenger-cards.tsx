import React from "react"
import {
  Card,
  Button,
  CardContent,
  Label,
  Text,
  InputCore,
  FormField,
} from "components"
import { PassengerType, ReservationType, useStore } from "store"
import { data } from "data"

const PassengerCard = ({
  index,
  formik,
  reservation,
  value,
}: {
  index: number
  formik: any
  reservation: ReservationType
  value: any
}) => {
  const passenger = reservation.passengers.find(
    passenger => passenger.id === value.id
  )
  const errors = formik?.errors?.passengers?.[index] || {}

  if (!passenger) return null

  return (
    <Card>
      <CardContent>
        <Text>{passenger.id}</Text>
        <Text>{passenger.personType}</Text>
        <div className="flex justify-between gap-2">
          <FormField
            formik={formik}
            value={value.name}
            placeholder="John Doe"
            label="Name"
            name={`passengers.${index}.name`}
          />
          <FormField
            placeholder="john@example.com"
            value={value.email}
            type="email"
            label="Email"
            formik={formik}
            name={`passengers.${index}.email`}
          />
          <FormField
            placeholder="XXXXXX"
            value={value.citizenId}
            label="Citizen ID"
            formik={formik}
            name={`passengers.${index}.citizenId`}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export const PassengerCards = ({
  reservation,
  formik,
}: {
  reservation: ReservationType
  formik: any
}) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mt-4 space-y-4">
        {formik.values.passengers.map((value, index) => (
          <PassengerCard
            key={value.id}
            reservation={reservation}
            formik={formik}
            value={value}
            index={index}
          />
        ))}
      </div>
      <div className="mt-4">
        <Button disabled={formik.errors?.passengers?.length} type="submit">
          {"Save"}
        </Button>
      </div>
    </form>
  )
}
