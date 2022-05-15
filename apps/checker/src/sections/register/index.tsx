import { useState } from "react"
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
import { useAuthStore } from "@/store"
import { FaCheckCircle } from "@react-icons/all-files/fa/FaCheckCircle"
import { toast } from "react-toastify"

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

const Form = ({ setSuccess }) => {
  const setWorker = useAuthStore(store => store.setWorker)
  const setWorkerTokens = useAuthStore(store => store.setWorkerTokens)
  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik({
    initialValues: registerInitialValues,
    onSubmit: async values => {
      setIsLoading(true)
      const result = await data.auth.register(values)
      setIsLoading(false)

      const success = result.status === 204

      if (!success) {
        toast.error("Something went wrong. Try again.")
        return
      }

      setSuccess(true)
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
        <Button isLoading={isLoading} type="submit">
          {"Register"}
        </Button>
      </div>
    </form>
  )
}

export const RegisterSection = () => {
  const [success, setSuccess] = useState(false)
  return (
    <SectionAndOffset>
      {success ? (
        <div className="flex flex-col items-center justify-center w-full h-full mt-24 space-y-4">
          <FaCheckCircle className="w-14 h-14 fill-green-500" />
          <Text variant="button">{"Register successful!"}</Text>
          <Text
            color="gray-light"
            dangerouslySetInnerHTML={{
              __html: "Go to your <b>email inbox</b> to verify your account!",
            }}
          ></Text>
        </div>
      ) : (
        <Card className="mx-auto max-w-[500px]">
          <CardHeading>
            <Text variant="h5" className="text-center">
              {"Register"}
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
