import React from "react"
import { Card, Button, CardContent, Label, Text, InputCore } from "components"
import { PassengerType, ReservationType, useStore } from "store"
import { useFormik } from "formik"
import * as Yup from "yup"

const PassengerCard = ({
  passenger,
  index,
  formik,
  errors,
}: {
  passenger: PassengerType
  index: number
  formik: any
  errors: any
}) => (
  <Card>
    <CardContent>
      <Text>{passenger.id}</Text>
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
            value={passenger.name}
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
            value={passenger.email}
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
            value={passenger.citizenId}
            onChange={formik.handleChange}
          />
        </div>
      </div>
    </CardContent>
  </Card>
)

const PassengersForm = ({ reservation }: { reservation: ReservationType }) => {
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
            errors={formik?.errors?.passengers?.[index] || {}}
            formik={formik}
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

export const PassengerCards = () => {
  const reservation = useStore(store => store.reservation)

  if (!reservation?.passengers) return null

  return <PassengersForm reservation={reservation} />
}
