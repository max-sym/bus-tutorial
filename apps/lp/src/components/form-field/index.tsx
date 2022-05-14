import React from "react"
import { Label, InputCore, Check } from "components"

export const FormField = ({
  name,
  label,
  type = "text",
  formik,
  value,
  placeholder,
}: {
  formik: any
  name: string
  label?: string
  type?: string
  value: any
  placeholder?: string
}) => {
  const error = formik.errors[name]

  return (
    <div>
      {type === "checkbox" ? (
        <Check
          id={name}
          name={name}
          value={value}
          onChange={formik.handleChange}
          label={label}
        />
      ) : (
        <>
          <Label color={error ? "red" : "gray-light"}>{label}</Label>
          <InputCore
            type={type}
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={formik.handleChange}
          />
        </>
      )}
    </div>
  )
}
