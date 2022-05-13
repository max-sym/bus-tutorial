import React, { useEffect } from "react"
import { Loading, Text } from "components"
import { LoginSection } from "sections"
import { useAuthStore } from "store"
import { data } from "data"
import { navigate } from "gatsby"

const LogoutPage = () => {
  const setUser = useAuthStore(store => store.setUser)
  const setUserTokens = useAuthStore(store => store.setUserTokens)

  const logout = async () => {
    const result = await data.auth.logout()

    if (result.status !== 204) return

    setUser(null)
    setUserTokens(null)
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

export default LogoutPage
