import { data } from "@/data"
import { useStore } from "@/store"
import { useEffect, useMemo, useState } from "react"
import { useQrCodeReader } from "./use-qr-code-reader"

export const useQrChecker = ({ videoRef }) => {
  const [reservation, setReservation] = useState(null)
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
    if (!qrCode || !qrCodeReader.qrScanner) return

    await qrCodeReader.qrScanner.pause()
    const reservation = await data.reservation.getOne(qrCode.split(":")[0])
    setReservation(reservation)
  }

  useEffect(() => {
    getReservation()
  }, [qrCode])

  return useMemo(
    () => ({ reservation, setReservation }),
    [reservation, setReservation]
  )
}
