import React from "react"
import {
  DateInput,
  GuestSelect,
  LocationSelect,
  useReactBookingForm,
} from "react-booking-form"
import moment from "moment"
import "flatpickr/dist/themes/material_green.css"
import { IoMdSwap } from "@react-icons/all-files/io/IoMdSwap"
import {
  Container,
  GuestOkButton,
  InputContainer,
  Label,
  Menu,
  MenuContainer,
  OptionContainer,
  SearchButton,
  SwapButton,
} from "./components"
import { GuestOptionComponent, InputComponent } from "./complex-components"
import { formSchema } from "./form-schema"

export const BookingForm = () => {
  const form = useReactBookingForm({ formSchema })

  const onBookButtonClick = () => {
    const config = {
      convertDate: (dateValue: Date) => moment(dateValue).format("DD-MM-YYYY"),
    }
    alert(form.serializeToURLParams(config))
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
          placeholder="Where are you going?"
        />
      </InputContainer>
      <InputContainer style={{ width: "auto" }}>
        <SwapButton
          title="Swap Locations"
          aria-label="Swap Locations"
          onClick={() => form.swapLocations()}
        >
          <IoMdSwap className="w-4 h-4" />
        </SwapButton>
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
          placeholder="Where are you going?"
        />
      </InputContainer>
      <InputContainer>
        <Label>{"Check in"}</Label>
        <DateInput
          inputComponent={InputComponent}
          className="w-full"
          placeholder="Add date"
          form={form}
          name="checkIn"
        />
      </InputContainer>
      <InputContainer>
        <Label>{"Check out"}</Label>
        <DateInput
          inputComponent={InputComponent}
          className="w-full"
          placeholder="Add date"
          form={form}
          name="checkOut"
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
        />
      </InputContainer>
      <InputContainer>
        <SearchButton onClick={onBookButtonClick}>{"Search"}</SearchButton>
      </InputContainer>
    </Container>
  )
}
