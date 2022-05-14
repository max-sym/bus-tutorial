import React, { useState } from "react"
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
import { navigate, Link } from "gatsby"
import { toast } from "react-toastify"
import { FaCheckCircle } from "@react-icons/all-files/fa/FaCheckCircle"

const initialValues = {
  email: "",
}

const Form = ({ setSuccess }) => {
  const formik = useFormik({
    initialValues,
    onSubmit: async values => {
      const result = await data.auth.requestPasswordReset(values)

      if (result.status !== 204) {
        toast.error(
          result?.response?.message || "Something went wrong. Try again."
        )
        return
      }

      setSuccess(true)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <Text className="text-center">
        {
          "Enter your email address below to receive an email with instructions to reset your password:"
        }
      </Text>
      <FormField
        value={formik.values["email"]}
        name="email"
        formik={formik}
        placeholder={"john@example.com"}
        label="Email"
      />
      <div className="flex justify-center">
        <Button type="submit">{"Send Email"}</Button>
      </div>
    </form>
  )
}

export const RequestPasswordResetSection = () => {
  const [success, setSuccess] = useState(false)

  return (
    <SectionAndOffset>
      {success ? (
        <div className="flex flex-col items-center justify-center w-full h-full mt-24 space-y-4">
          <FaCheckCircle className="w-14 h-14 fill-green-500" />
          <Text variant="button">{"Email sent!"}</Text>
          <Text
            color="gray-light"
            dangerouslySetInnerHTML={{
              __html:
                "Go to your <b>email inbox</b> and follow the instructions in the email we've just sent!",
            }}
          ></Text>
        </div>
      ) : (
        <Card className="mx-auto max-w-[500px]">
          <CardHeading>
            <Text variant="h5" className="text-center">
              {"Request Password Reset"}
            </Text>
          </CardHeading>
          <CardContent>
            <Form setSuccess={setSuccess} />
          </CardContent>
        </Card>
      )}
    </SectionAndOffset>
  )
}
