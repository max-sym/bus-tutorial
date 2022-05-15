import { useEffect } from "react"
import { Loading, Text } from "@bus/ui"
import { useAuthStore } from "@/store"
import { data } from "@/data"
import { useNavigate } from "react-router-dom"

export const Logout = () => {
  const setWorker = useAuthStore(store => store.setWorker)
  const setWorkerTokens = useAuthStore(store => store.setWorkerTokens)
  const navigate = useNavigate()

  const logout = async () => {
    const result = await data.auth.logout()

    if (result.status !== 204) return

    setWorker(null)
    setWorkerTokens(null)
    navigate("/")
  }

  useEffect(() => {
    logout()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center w-full h-full mt-24 space-y-4">
      <Loading className="w-14 h-14 fill-green-500" />
      <Text variant="button">{"Logging out..."}</Text>
    </div>
  )
}
