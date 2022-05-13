import React, { useState } from "react"
import {
  Card,
  Text,
  CardHeading,
  CardContent,
  FormField,
  Button,
  ModalType,
} from "components"
import { useFormik } from "formik"
import { useAuthStore } from "store"
import * as Yup from "yup"
import { data } from "data"
import { toast } from "react-toastify"

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string().required("Required"),
})

export const ChangePasswordModal = ({ modal }: { modal?: ModalType }) => {
  const [isLoading, setIsLoading] = useState(false)

  const initialValues = {
    password: "",
    confirmPassword: "",
  }

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async values => {
      setIsLoading(true)
      const result = await data.user.changePassword(values)
      setIsLoading(false)

      if (result.status !== 204) {
        toast.error("Something went wrong!")
        return
      }

      toast.success("Update successful!")
      modal.setIsOpen(false)
    },
  })

  return (
    <Card>
      <CardHeading>
        <Text>{"Change Password"}</Text>
      </CardHeading>
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
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
          <div className="flex justify-center mt-4">
            <Button
              disabled={!formik.isValid}
              isLoading={isLoading}
              type="submit"
            >
              {"Change"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
