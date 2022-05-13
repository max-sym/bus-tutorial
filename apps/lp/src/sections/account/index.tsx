import React from "react"
import {
  Card,
  Text,
  CardHeading,
  CardContent,
  FormField,
  SectionAndOffset,
  Button,
  Separator,
} from "components"
import { useFormik } from "formik"
import { data } from "data"
import { useAuthStore } from "store"
import { navigate } from "gatsby"
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle"

const UserData = () => {
  const user = useAuthStore(store => store.user)

  if (!user) return null

  return (
    <Card className="mx-auto max-w-[500px]">
      <CardHeading>
        <Text variant="h5" className="text-center">
          {"Account"}
        </Text>
      </CardHeading>
      <CardContent>
        <div>
          <FaUserCircle className="w-16 h-16 mx-auto dark:fill-white fill-gray-500" />
          <div>
            <Text>{"Name: " + user.name}</Text>
            <Text>{"Email: " + user.email}</Text>
          </div>
        </div>
        <Separator className="w-full mt-4" />
        <div className="mt-4 space-y-4">
          <Button>{"Edit Data"}</Button>
          <Button>{"Reset Password"}</Button>
          <Text variant="button">{"Danger Zone"}</Text>
          <Button color="red">{"Delete Account"}</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export const AccountSection = () => {
  return (
    <SectionAndOffset>
      <UserData />
    </SectionAndOffset>
  )
}
