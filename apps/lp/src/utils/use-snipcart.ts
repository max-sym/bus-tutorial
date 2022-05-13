import { useEffect } from "react"
import { useStore } from "store"

const customizePaymentFormTheme = () => {
  window.Snipcart.api.theme.customization.registerPaymentFormCustomization({
    input: {
      backgroundColor: "#222",
      color: "#fff",
      border: "1px solid #fff",
      fontSize: "16px",
      placeholder: {
        color: "#aaa",
      },
    },
    label: {
      color: "#fff",
      fontSize: "20px",
    },
  })
}

export const useSnipcart = () => {
  const setReservation = useStore(store => store.setReservation)

  useEffect(() => {
    if (!window?.Snipcart) return

    window.Snipcart.events.on("snipcart.initialized", () => {
      customizePaymentFormTheme()
      window.Snipcart.events.on("cart.confirmed", () => {
        console.log("first")
        setReservation(null)
      })
    })
  }, [])
}
