import React from "react"
import { Card, Button, CardContent, Label, Text, InputCore } from "components"
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
          <div>
            <Label
              color={errors.name ? "red" : "gray-light"}
              as="label"
              variant="subtitle"
            >
              {"Name"}
            </Label>
            <InputCore
              placeholder="John Doe"
              value={value.name}
              name={`passengers.${index}.name`}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <Label
              color={errors.email ? "red" : "gray-light"}
              as="label"
              variant="subtitle"
            >
              {"Email"}
            </Label>
            <InputCore
              placeholder="john@example.com"
              value={value.email}
              type="email"
              name={`passengers.${index}.email`}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <Label
              color={errors.citizenId ? "red" : "gray-light"}
              as="label"
              variant="subtitle"
            >
              {"Citizen ID"}
            </Label>
            <InputCore
              placeholder="XXXXXX"
              name={`passengers.${index}.citizenId`}
              value={value.citizenId}
              onChange={formik.handleChange}
            />
          </div>
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
