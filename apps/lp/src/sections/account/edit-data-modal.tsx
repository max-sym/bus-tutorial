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
  name: Yup.string().required("Required"),
})

export const EditDataModal = ({ modal }: { modal: ModalType }) => {
  const user = useAuthStore(store => store.user)
  const setUser = useAuthStore(store => store.setUser)
  const [isLoading, setIsLoading] = useState(false)

  const initialValues = {
    name: user?.name || "",
  }

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async values => {
      setIsLoading(true)
      const result = await data.user.updateData(values)
      setIsLoading(false)

      if (result.status !== 200) {
        toast.error("Something went wrong!")
        return
      }

      toast.success("Update successful!")
      setUser(result.response)
      modal.setIsOpen(false)
    },
  })

  return (
    <Card>
      <CardHeading>
        <Text>{"Edit Data"}</Text>
      </CardHeading>
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <FormField
            value={formik.values["name"]}
            name="name"
            formik={formik}
            placeholder={"John Doe"}
            label="Name"
          />
          <div className="flex justify-center mt-4">
            <Button
              disabled={!formik.isValid}
              isLoading={isLoading}
              type="submit"
            >
              {"Update"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
