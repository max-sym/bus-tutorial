import React from "react"
import {
  Card,
  Text,
  CardHeading,
  CardContent,
  FormField,
  SectionAndOffset,
  Button,
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
