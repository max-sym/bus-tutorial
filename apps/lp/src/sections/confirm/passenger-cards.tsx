import React from "react"
import { Card, Button, CardContent, Label, Text, InputCore } from "components"
import { PassengerType, ReservationType, useStore } from "store"
import { useFormik } from "formik"

const PassengerCard = ({
  passenger,
  index,
  formik,
}: {
  passenger: PassengerType
  index: number
  formik: any
}) => (
  <Card>
    <CardContent>
      <Text>{passenger.id}</Text>
      <div className="flex justify-between gap-2">
        <div>
          <Label>{"Name"}</Label>
          <InputCore
            placeholder="John Doe"
            value={passenger.name}
            name={`passengers.${index}.name`}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <Label>{"Email"}</Label>
          <InputCore
            placeholder="john@example.com"
            value={passenger.email}
            type="email"
            name={`passengers.${index}.email`}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <Label>{"Citizen ID"}</Label>
          <InputCore
            placeholder="XXXXXX"
            name={`passengers.${index}.citizenId`}
            value={passenger.citizenId}
            onChange={formik.handleChange}
          />
        </div>
      </div>
    </CardContent>
  </Card>
)

const PassengersForm = ({ reservation }: { reservation: ReservationType }) => {
  const formik = useFormik({
    initialValues: {
      passengers: reservation.passengers.map(passenger => ({
        id: passenger.id,
        name: passenger.name || "",
        email: passenger.email || "",
        citizenId: passenger.citizenId || "",
      })),
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mt-4 space-y-4">
        {formik.values.passengers.map((passenger, index) => (
          <PassengerCard
            key={passenger.id}
            index={index}
            passenger={passenger}
            formik={formik}
          />
        ))}
      </div>
      <div className="mt-4">
        <Button type="submit">{"Save"}</Button>
      </div>
    </form>
  )
}

export const PassengerCards = () => {
  const reservation = useStore(store => store.reservation)

  if (!reservation?.passengers) return null

  return <PassengersForm reservation={reservation} />
}
