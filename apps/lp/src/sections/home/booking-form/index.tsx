import React from "react"
import {
  DateInput,
  GuestSelect,
  LocationSelect,
  useReactBookingForm,
} from "react-booking-form"
import moment from "moment"
import { IoMdSwap } from "@react-icons/all-files/io/IoMdSwap"
import {
  Container,
  GuestOkButton,
  InputContainer,
  Label,
  Menu,
  MenuContainer,
  OptionContainer,
} from "./components"
// Temporary fix is to use a relative import here for webpack alias import issue:
// https://stackoverflow.com/questions/70015963/runtime-error-appeared-after-updating-to-webpack-5-typeerror-cannot-read-prope
import { Button } from "../../../components"
import { GuestOptionComponent, InputComponent } from "./complex-components"
import { formSchema } from "./form-schema"
import { navigate } from "gatsby"
import { Portal } from "@headlessui/react"

export const BookingForm = () => {
  const form = useReactBookingForm({ formSchema })

  const onBookButtonClick = () => {
    const config = {
      convertDate: (dateValue: Date) => moment(dateValue).format("DD-MM-YYYY"),
    }
    navigate("/search?" + form.serializeToURLParams(config))
  }

  return (
    <Container>
      <InputContainer>
        <Label>{"From"}</Label>
        <LocationSelect
          form={form}
          menu={Menu}
          menuContainer={MenuContainer}
          option={OptionContainer}
          inputComponent={InputComponent}
          name="from"
          emptyOption="Nothing was found :("
          placeholder="Where from?"
          portal={Portal}
        />
      </InputContainer>
      <InputContainer style={{ width: "auto" }}>
        <Button
          title="Swap Locations"
          variant="round"
          className="mt-6"
          aria-label="Swap Locations"
          onClick={() => form.swapLocations()}
        >
          <IoMdSwap className="w-4 h-4" />
        </Button>
      </InputContainer>
      <InputContainer>
        <Label>{"To"}</Label>
        <LocationSelect
          form={form}
          menu={Menu}
          menuContainer={MenuContainer}
          option={OptionContainer}
          inputComponent={InputComponent}
          name="to"
          emptyOption="Nothing was found :("
          placeholder="Where to?"
          portal={Portal}
        />
      </InputContainer>
      <InputContainer>
        <Label>{"Departure"}</Label>
        <DateInput
          inputComponent={InputComponent}
          className="w-full"
          placeholder="Add date"
          form={form}
          name="departureDate"
        />
      </InputContainer>
      <InputContainer>
        <Label>{"Guests"}</Label>
        <GuestSelect
          form={form}
          menuContainer={MenuContainer}
          menu={Menu}
          inputComponent={InputComponent}
          option={GuestOptionComponent}
          okButton={GuestOkButton}
          okText="Ok!"
          placeholder="Add guests"
          name={"guests"}
          portal={Portal}
        />
      </InputContainer>
      <InputContainer>
        <Button className="w-full py-5" onClick={onBookButtonClick}>
          {"Search"}
        </Button>
      </InputContainer>
    </Container>
  )
}
