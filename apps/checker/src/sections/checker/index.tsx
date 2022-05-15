import { ReservationType } from "@/../../shared/src"
import { data } from "@/data"
import { useStore } from "@/store"
import { toast } from "react-toastify"
import {
  Text,
  Button,
  Modal,
  useModal,
  Card,
  CardContent,
  CardHeading,
  CardFooter,
  ModalType,
} from "@bus/ui"
import { Portal } from "@headlessui/react"
import moment from "moment"
import { useEffect, useState } from "react"
import { useRef } from "react"
import tw from "tailwind-styled-components"
import { Actions } from "./actions"
import { useQrChecker } from "./use-qr-checker"

const Row = tw.div`flex gap-4 justify-between items-start`

const ReservationCheckerModal = ({
  reservation,
  modal,
}: {
  reservation: ReservationType
  modal?: ModalType
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const qrCode = useStore(store => store.qrCode)
  const qrCodeReader = useStore(store => store.qrCodeReader)

  if (!qrCode) return null

  const passengerId = +qrCode.split(":")[2]
  const reservedTicketId = +qrCode.split(":")[1]

  const passenger = reservation.passengers.find(
    passenger => passenger.id === passengerId
  )

  const reservedTicket = passenger.reservedTickets.find(
    reservedTicket => reservedTicket.id === reservedTicketId
  )

  const reservedTrip = reservation.reservedTrips.find(
    reservedTrip => reservedTrip.id === reservedTicket.reservedTripId
  )

  const onCancelClick = () => {
    modal.setIsOpen(false)
  }

  const onConfirmClick = async () => {
    setIsLoading(true)
    const result = await data.reservedTicket.confirm(reservedTicket.id)
    setIsLoading(false)
    if (result.status !== 200) {
      toast.error("Something went wrong. Please try again!")
      return
    }

    toast.success("Confirmed!")
    modal.setIsOpen(false)
    qrCodeReader.qrScanner.start()
    useStore.setState({ qrCode: null })
  }

  return (
    <Card>
      <CardHeading>
        <Text variant="h5">{"Confirm ticket?"}</Text>
      </CardHeading>
      <CardContent>
        <Text variant="button">{"Passenger:"}</Text>
        <Row>
          <Text>{"Name:"}</Text>
          <Text>{passenger.name}</Text>
        </Row>
        <Row>
          <Text>{"Email:"}</Text>
          <Text>{passenger.email}</Text>
        </Row>
        <Row>
          <Text>{"Type:"}</Text>
          <Text>{passenger.personType}</Text>
        </Row>
        <Row>
          <Text>{"Citizen ID:"}</Text>
          <Text>{passenger.citizenId}</Text>
        </Row>
        <Text variant="button">{"Trip:"}</Text>
        <Row>
          <Text>{"From"}</Text>
          <Text>{reservedTrip.trip.cityFrom.name}</Text>
        </Row>
        <Row>
          <Text>{"To"}</Text>
          <Text>{reservedTrip.trip.cityTo.name}</Text>
        </Row>
        <Row>
          <Text>{"Departure"}</Text>
          <Text>{moment(reservedTrip.trip.departure).format("LT L")}</Text>
        </Row>
        <Row>
          <Text>{"Arrival"}</Text>
          <Text>{moment(reservedTrip.trip.arrival).format("LT L")}</Text>
        </Row>
        <Row>
          <Text>{"Bus"}</Text>
          <Text>{reservedTrip.trip.bus.name}</Text>
        </Row>
        <Text variant="button">{"Ticket"}</Text>
        <Row>
          <Text>{"State"}</Text>
          <Text>{reservedTicket.state}</Text>
        </Row>
      </CardContent>
      <CardFooter>
        <Row>
          <Button color="red" onClick={onCancelClick}>
            {"Cancel"}
          </Button>
          <Button isLoading={isLoading} onClick={onConfirmClick}>
            {"Confirm"}
          </Button>
        </Row>
      </CardFooter>
    </Card>
  )
}

const QRScannerContainer = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const { reservation, setReservation } = useQrChecker({ videoRef })

  const modal = useModal({
    customComponent: <ReservationCheckerModal reservation={reservation} />,
  })

  useEffect(() => {
    if (!reservation) return

    modal.setIsOpen(true)
  }, [reservation])

  return (
    <div className="fixed inset-0 z-50">
      <div className="w-full h-full bg-black">
        <video className="w-full h-full border-0" ref={videoRef} />
        <Actions />
        <Modal modal={modal} />
      </div>
    </div>
  )
}

export const CheckerSection = () => {
  const isScannerOpen = useStore(store => store.isScannerOpen)

  const onStartClick = () => {
    useStore.setState({ isScannerOpen: true })
  }

  return (
    <div>
      <Text>
        {"In this section you can check the tickets that have QR code."}
      </Text>
      <Button className="mt-4" onClick={onStartClick}>
        {"Start Checking"}
      </Button>
      <Portal>{isScannerOpen && <QRScannerContainer />}</Portal>
    </div>
  )
}
