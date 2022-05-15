import React, { useState } from "react"
import {
  Card,
  Text,
  CardHeading,
  CardContent,
  FormField,
  Button,
  ModalType,
} from "@bus/ui"
import { useFormik } from "formik"
import { useAuthStore } from "store"
import * as Yup from "yup"
import { data } from "data"
import { toast } from "react-toastify"
import { navigate } from "gatsby"

const validationSchema = Yup.object().shape({
  confirmationMessage: Yup.string()
    .is(["Delete My Account"])
    .required("Required"),
})

const initialValues = {
  confirmationMessage: "",
}

export const DeleteAccountModal = ({ modal }: { modal?: ModalType }) => {
  const user = useAuthStore(store => store.user)
  const setUser = useAuthStore(store => store.setUser)
  const setUserTokens = useAuthStore(store => store.setUserTokens)
  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async _values => {
      setIsLoading(true)
      const result = await data.user.deleteAccount()
      setIsLoading(false)

      if (result.status !== 204) {
        toast.error("Something went wrong!")
        return
      }

      toast.success("Your account was deleted!")
      setUser(null)
      setUserTokens(null)
      navigate("/login")

      modal?.setIsOpen(false)
    },
  })

  return (
    <Card className="max-w-[500px] mx-auto">
      <CardHeading>
        <Text variant="h5">{"Delete Account"}</Text>
      </CardHeading>
      <CardContent>
        <Text color="gray-light">
          {
            "This action is irreversible: you won't be able to restore your account as your account data will be completely deleted from our servers."
          }
        </Text>
        <Text
          className="my-4"
          color="gray-light"
          dangerouslySetInnerHTML={{
            __html:
              'Type <b>"Delete My Account"</b> below to confirm this action',
          }}
        />
        <form onSubmit={formik.handleSubmit}>
          <FormField
            value={formik.values["confirmationMessage"]}
            name="confirmationMessage"
            formik={formik}
            placeholder={"Delete My Account"}
            label="Confirmation Message"
          />
          <div className="flex justify-center mt-4">
            <Button
              disabled={!formik.isValid}
              isLoading={isLoading}
              type="submit"
              color="red"
            >
              {"Delete My Account"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
