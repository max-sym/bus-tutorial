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

export const registerInitialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptedPrivacy: false,
}

const LabelForTerms = () => (
  <span>
    {"I agree with "}
    <Text
      $as="a"
      color="green"
      href="/terms"
      target="_blank"
      rel="noreferrer noopener"
    >
      {"Terms and Conditions"}
    </Text>
    {" and "}
    <Text
      $as="a"
      color="green"
      href="/privacy"
      target="_blank"
      rel="noreferrer noopener"
    >
      {"Privacy Policy"}
    </Text>
    {" of this website"}
  </span>
)

const Form = () => {
  const setUser = useAuthStore(store => store.setUser)
  const setUserTokens = useAuthStore(store => store.setUserTokens)

  const formik = useFormik({
    initialValues: registerInitialValues,
    onSubmit: async values => {
      const result = await data.auth.register(values)

      if (result.status !== 201) return

      setUser(result.response.user)
      setUserTokens(result.response.tokens)
      navigate("/account")
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <FormField
        value={formik.values["name"]}
        name="name"
        formik={formik}
        placeholder={"John Doe"}
        label="Name"
      />
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
      <FormField
        value={formik.values["confirmPassword"]}
        name="confirmPassword"
        type="password"
        formik={formik}
        placeholder={"xxxxxx"}
        label="Confirm Password"
      />
      <FormField
        value={formik.values["acceptedPrivacy"]}
        name="acceptedPrivacy"
        type="checkbox"
        formik={formik}
        label={<LabelForTerms />}
      />
      <div className="flex justify-center">
        <Button type="submit">{"Register"}</Button>
      </div>
    </form>
  )
}

export const RegisterSection = () => {
  return (
    <SectionAndOffset>
      <Card className="mx-auto max-w-[500px]">
        <CardHeading>
          <Text variant="h5" className="text-center">
            {"Register"}
          </Text>
        </CardHeading>
        <CardContent>
          <Form />
        </CardContent>
      </Card>
    </SectionAndOffset>
  )
}
