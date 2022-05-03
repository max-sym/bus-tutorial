import { useEffect } from "react"
import { useStore } from "store"

export const useSnipcart = () => {
  const setReservation = useStore(store => store.setReservation)

  useEffect(() => {
    window.Snipcart.events.on("snipcart.initialized", () => {
      window.Snipcart.events.on("cart.confirmed", () => {
        setReservation(null)
      })
    })
  }, [])
}
