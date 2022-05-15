import { data } from "@/data"
import { useStore } from "@/store"
import { useEffect } from "react"
import { useQrCodeReader } from "./use-qr-code-reader"

export const useQrChecker = ({ videoRef }) => {
  const qrCode = useStore(store => store.qrCode)

  const qrCodeReader = useQrCodeReader({
    videoRef,
    onQrCodeDetected: result => {
      useStore.setState({ qrCode: result.data })
    },
  })

  useEffect(() => {
    useStore.setState({ qrCodeReader })
  }, [qrCodeReader])

  const getReservation = async () => {
    const reservation = await data.reservation.getOne(qrCode)
    console.log("reservation", reservation)
  }

  useEffect(() => {
    getReservation()
  }, [qrCode])
}
