import React from "react"
import { GuestOption, BookingForm as BookingFormType } from "react-booking-form"
import {
  GuestButton,
  IconContainer,
  InputCore,
  OptionBase,
  SmallText,
  Text,
} from "./components"
import { FaMapMarkerAlt } from "@react-icons/all-files/fa/FaMapMarkerAlt"
import { FaCalendarAlt } from "@react-icons/all-files/fa/FaCalendarAlt"
import { FaSpinner } from "@react-icons/all-files/fa/FaSpinner"
import { FaPlus } from "@react-icons/all-files/fa/FaPlus"
import { FaMinus } from "@react-icons/all-files/fa/FaMinus"
import { FaUser } from "@react-icons/all-files/fa/FaUser"

type InputProps = {
  form?: BookingFormType
  isLoading?: boolean
  name?: string
  containerRef?: React.RefObject<HTMLDivElement>
}

const iconsList = {
  location: FaMapMarkerAlt,
  date: FaCalendarAlt,
  peopleCount: FaUser,
}

export const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  ({ isLoading, containerRef, form, name, ...props }, ref) => {
    const itemType = name && form?.formSchema[name].type
    const InputIcon = isLoading ? FaSpinner : iconsList[itemType || "location"]

    return (
      <div className="relative w-full group" ref={containerRef}>
        <InputCore data-input ref={ref} name={name} {...props} />
        <IconContainer title="toggle" data-toggle>
          <InputIcon className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
        </IconContainer>
      </div>
    )
  }
)

export const GuestOptionComponent = ({
  form,
  name,
  option,
}: {
  form: BookingFormType
  name: string
  option: GuestOption
}) => (
  <OptionBase className="flex items-center justify-between">
    <div>
      <Text>{option.label}</Text>
      <SmallText>{option.description}</SmallText>
    </div>
    <div className="flex items-center justify-center gap-x-2">
      <GuestButton
        onClick={form.onPlusClick(option, name)}
        disabled={form.getIsOptionDisabled(option, "plus")}
      >
        <FaPlus className="w-3 h-3" />
      </GuestButton>
      <Text>{option.value}</Text>
      <GuestButton
        onClick={form.onMinusClick(option, name)}
        disabled={form.getIsOptionDisabled(option, "minus")}
      >
        <FaMinus className="w-3 h-3" />
      </GuestButton>
    </div>
  </OptionBase>
)
