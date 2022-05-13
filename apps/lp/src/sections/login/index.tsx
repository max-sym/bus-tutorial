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
import { toast } from "react-toastify"

export const loginInitialValues = {
  email: "",
  password: "",
}

const Form = () => {
  const setUser = useAuthStore(store => store.setUser)
  const setUserTokens = useAuthStore(store => store.setUserTokens)

  const formik = useFormik({
    initialValues: loginInitialValues,
    onSubmit: async values => {
      const result = await data.auth.login(values)

      if (result.status !== 200) {
        toast.error(
          result?.response?.message || "Something went wrong. Try again."
        )
        return
      }

      setUser(result.response.user)
      setUserTokens(result.response.tokens)
      navigate("/account")
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <FormField
        value={formik.values["email"]}
        name="email"
        formik={formik}
        placeholder={"john@example.com"}
        label="Email"
      />
      <FormField
        value={formik.values["password"]}
        name="password"
        type="password"
        formik={formik}
        placeholder={"xxxxxx"}
        label="Password"
      />
      <div className="flex justify-center">
        <Button type="submit">{"Login"}</Button>
      </div>
    </form>
  )
}

export const LoginSection = () => {
  return (
    <SectionAndOffset>
      <Card className="mx-auto max-w-[500px]">
        <CardHeading>
          <Text variant="h5" className="text-center">
            {"Login"}
          </Text>
        </CardHeading>
        <CardContent>
          <Form />
        </CardContent>
      </Card>
    </SectionAndOffset>
  )
}
