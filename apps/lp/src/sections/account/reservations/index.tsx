import React from "react"
import {
  Card,
  Text,
  CardHeading,
  CardContent,
  SectionAndOffset,
  Button,
  Loading,
} from "components"
import { data, useLoadResource } from "data"
import { ReservationType } from "store"
import { getTotalPriceWithDiscount } from "utils"
import { Link } from "gatsby"
import moment from "moment"

export * from "./reservation"

const ReservationItem = ({ reservation }: { reservation: ReservationType }) => {
  return (
    <tr>
      <td>
        <Text>{reservation.token}</Text>
      </td>
      <td>
        <Text>{reservation.state}</Text>
      </td>
      <td>
        <Text>€{getTotalPriceWithDiscount(reservation)}</Text>
      </td>
      <td>
        <Text>{moment(reservation.createdAt).format("LL")}</Text>
      </td>
      <td>
        <Link to={`/account/reservations/${reservation.token}`}>
          <Button>{"Show"}</Button>
        </Link>
      </td>
    </tr>
  )
}

const TableHeader = () => (
  <thead className="text-left">
    <th>
      <Text>{"ID"}</Text>
    </th>
    <th>
      <Text>{"State"}</Text>
    </th>
    <th>
      <Text>{"Total Price"}</Text>
    </th>
    <th>
      <Text>{"Date"}</Text>
    </th>
    <th></th>
  </thead>
)

const Reservations = ({
  reservations,
}: {
  reservations: ReservationType[]
}) => {
  return (
    <table className="w-full">
      <TableHeader />
      <tbody>
        {reservations.map(reservation => (
          <ReservationItem key={reservation.id} reservation={reservation} />
        ))}
      </tbody>
    </table>
  )
}

export const ReservationsSection = () => {
  const { resource, isLoading } = useLoadResource(async () => {
    const result = await data.reservation.getMany()
    return result
  })

  if (!resource) return null

  return (
    <SectionAndOffset>
      <Card>
        <CardHeading>
          <Text variant="h5">{"My Reservations"}</Text>
        </CardHeading>
        <CardContent>
          {isLoading ? <Loading /> : <Reservations reservations={resource} />}
        </CardContent>
      </Card>
    </SectionAndOffset>
  )
}
