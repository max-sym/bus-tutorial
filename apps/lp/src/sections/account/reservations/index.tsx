import React from "react"
import {
  Card,
  Text,
  CardHeading,
  CardContent,
  SectionAndOffset,
  Button,
  Loading,
} from "@bus/ui"
import { data, useLoadResource } from "data"
import { ReservationType } from "@bus/shared"
import { getTotalPriceWithDiscount } from "utils"
import { Link } from "gatsby"
import moment from "moment"
import tw from "tailwind-styled-components"

export * from "./reservation"

const ReservationItem = ({ reservation }: { reservation: ReservationType }) => (
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

const MobileRow = tw.div`flex justify-between gap-2`

const ReservationItemMobile = ({
  reservation,
}: {
  reservation: ReservationType
}) => (
  <Card>
    <CardContent>
      <MobileRow>
        <Text>{"ID: "}</Text>
        <Text>{reservation.token}</Text>
      </MobileRow>
      <MobileRow>
        <Text>{"State: "}</Text>
        <Text>{reservation.state}</Text>
      </MobileRow>
      <MobileRow>
        <Text>{"Price: "}</Text>
        <Text>€{getTotalPriceWithDiscount(reservation)}</Text>
      </MobileRow>
      <MobileRow>
        <Text>{"Date: "}</Text>
        <Text>{moment(reservation.createdAt).format("LL")}</Text>
      </MobileRow>
      <div className="flex justify-end mt-4">
        <Link to={`/account/reservations/${reservation.token}`}>
          <Button>{"Show"}</Button>
        </Link>
      </div>
    </CardContent>
  </Card>
)

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
    <>
      <div className="space-y-4 md:hidden">
        {reservations.map(reservation => (
          <ReservationItemMobile
            key={reservation.id}
            reservation={reservation}
          />
        ))}
      </div>
      <div className="hidden md:block">
        <Card>
          <CardHeading>
            <Text variant="h5">{"My Reservations"}</Text>
          </CardHeading>
          <CardContent>
            <table className="w-full">
              <TableHeader />
              <tbody>
                {reservations.map(reservation => (
                  <ReservationItem
                    key={reservation.id}
                    reservation={reservation}
                  />
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </>
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
      <Text className="mb-4 md:hidden" variant="h5">
        {"My Reservations"}
      </Text>
      {isLoading ? <Loading /> : <Reservations reservations={resource} />}
    </SectionAndOffset>
  )
}
