import { useQrCodeReader } from "@/sections/checker/use-qr-code-reader"
import create from "zustand"

export * from "./auth-store"

export type StoreType = {
  isScannerOpen: boolean
  qrCode: string | null
  qrCodeReader: ReturnType<typeof useQrCodeReader> | null
}

export const useStore = create<StoreType>(_set => ({
  isScannerOpen: false,
  qrCode: null,
  qrCodeReader: null,
}))
