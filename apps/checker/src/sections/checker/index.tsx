import { useStore } from "@/store"
import { Text, Button } from "@bus/ui"
import { Portal } from "@headlessui/react"
import { useRef } from "react"
import { Actions } from "./actions"
import { useQrChecker } from "./use-qr-checker"

const QRScannerContainer = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useQrChecker({ videoRef })

  return (
    <div className="fixed inset-0 z-50">
      <div className="w-full h-full bg-black">
        <video className="w-full h-full border-0" ref={videoRef} />
        <Actions />
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
