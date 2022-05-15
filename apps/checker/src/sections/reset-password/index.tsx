import { useState, useEffect } from "react"
import {
  Card,
  Text,
  CardHeading,
  CardContent,
  FormField,
  SectionAndOffset,
  Button,
} from "@bus/ui"
import { useFormik } from "formik"
import { data } from "@/data"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import * as Yup from "yup"
import { getUrlParams } from "@bus/shared"

const initialValues = {
  password: "",
  confirmPassword: "",
}

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string().required("Required"),
})

const Form = () => {
  const params = getUrlParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!params?.get("token")) {
      console.error("Token not found.")
      navigate("/")
    }
  }, [])

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => {
      if (!params) return

      const result = await data.auth.resetPassword({
        token: params.get("token") as string,
        password: values.password,
      })

      if (result.status !== 204) {
        toast.error(
          result?.response?.message || "Something went wrong. Try again."
        )
        return
      }

      toast.success("Password was successfully reset!")
      navigate("/")
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <FormField
        value={formik.values["password"]}
        name="password"
        formik={formik}
        type="password"
        placeholder={"xxxxxx"}
        label="Password"
      />
      <FormField
        value={formik.values["confirmPassword"]}
        name="confirmPassword"
        formik={formik}
        type="password"
        placeholder={"xxxxxx"}
        label="Confirm Password"
      />
      <div className="flex justify-center">
        <Button type="submit">{"Reset Password"}</Button>
      </div>
    </form>
  )
}

export const ResetPasswordSection = () => {
  return (
    <SectionAndOffset>
      {
        <Card className="mx-auto max-w-[500px]">
          <CardHeading>
            <Text variant="h5" className="text-center">
              {"Reset Password"}
            </Text>
          </CardHeading>
          <CardContent>
            <Form />
          </CardContent>
        </Card>
      }
    </SectionAndOffset>
  )
}
