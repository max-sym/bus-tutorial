import QrScanner from "qr-scanner"
import { useMemo, useState } from "react"
import { useCallback } from "react"
import { useEffect } from "react"

const defaultCameras: QrScanner.Camera[] = [
  { id: "environment", label: "Environment Facing (default)" },
  { id: "user", label: "User Facing" },
]

export const useQrCodeReader = ({
  videoRef,
  onQrCodeDetected,
}: {
  videoRef: React.MutableRefObject<HTMLVideoElement>
  onQrCodeDetected: (result: QrScanner.ScanResult) => void
}) => {
  const [qrScanner, setQrScannner] = useState<QrScanner | null>(null)
  const [cameras, setCameras] = useState<QrScanner.Camera[]>([])
  const [selectedCamera, setSelectedCamera] = useState<string>("environment")

  const getCameras = useCallback(async () => {
    const cameras = await QrScanner.listCameras(true)

    setCameras([...defaultCameras, ...cameras])
  }, [])

  useEffect(() => {
    if (!videoRef.current) return

    const qrScanner = new QrScanner(videoRef.current, onQrCodeDetected, {
      maxScansPerSecond: 2,
      highlightCodeOutline: true,
      highlightScanRegion: true,
    })
    qrScanner.start().then(() => {
      getCameras()
    })

    setQrScannner(qrScanner)
  }, [])

  const changeCamera = useCallback(
    (cameraId: string) => {
      qrScanner.setCamera(cameraId)
      setSelectedCamera(cameraId)
    },
    [qrScanner]
  )

  return useMemo(
    () => ({ qrScanner, cameras, changeCamera, selectedCamera }),
    [qrScanner, cameras, changeCamera, selectedCamera]
  )
}
