import React, { useEffect, useState } from "react"
import { Loading, Text } from "@bus/ui"
import { LoginSection } from "sections"
import { useAuthStore } from "store"
import { data } from "data"
import { navigate } from "gatsby"
import { getUrlParams } from "@bus/shared"
import { toast } from "react-toastify"
import { IoMdWarning } from "@react-icons/all-files/io/IoMdWarning"

const VerifyEmailPage = () => {
  const setUser = useAuthStore(store => store.setUser)
  const setUserTokens = useAuthStore(store => store.setUserTokens)
  const [isLoading, setIsLoading] = useState(false)
  const [errorOccurred, setErrorOccurred] = useState(false)

  const params = getUrlParams()

  const verifyEmail = async (params: URLSearchParams) => {
    setIsLoading(true)
    const token = params.get("token") as string
    const result = await data.auth.verifyEmail(token)

    setIsLoading(false)
    const success = result.status === 204
    if (!success) return setErrorOccurred(true)

    toast.success("You email was verified! You can login now!")
    navigate("/login")
  }

  useEffect(() => {
    if (!params) {
      setErrorOccurred(true)
      return
    }
    verifyEmail(params)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center w-full h-full mt-24 space-y-4">
      {isLoading && (
        <>
          <Loading className="w-14 h-14 fill-green-500" />
          <Text variant="button">{"Verifying email..."}</Text>
        </>
      )}
      {errorOccurred && (
        <>
          <IoMdWarning className="w-14 h-14 fill-red-500" />
          <Text>{"Something went wrong!"}</Text>
          <Text>{"Try again or contact us at xxx@email.com"}</Text>
        </>
      )}
    </div>
  )
}

export default VerifyEmailPage
