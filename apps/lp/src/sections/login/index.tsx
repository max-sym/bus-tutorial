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

const initialValues = {
  email: "",
  password: "",
}

const Form = () => {
  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      //
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
