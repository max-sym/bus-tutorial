import { data } from "data"
import { FormSchema, LocationOption } from "react-booking-form"
import { cities } from "./cities"

// This is mocking a call to API that would return location search results
// whenever user types into the location input field.
const searchPlace = async (query: string) => {
  const result = await data.city.getMany(query)
  if (!result?.length) return []

  return result.map(item => ({ value: item.slug, label: item.name }))
}

// This is the list of cities to be shown initially when user didn't start the search of location yet.
const defaultLocationOptions: LocationOption[] = cities.slice(0, 5)

const dateConfig = {
  altInput: true,
  altFormat: "M j, Y",
  dateFormat: "Y-m-d",
  wrap: true,
}

export const formSchema: FormSchema = {
  from: {
    type: "location",
    options: { defaultLocationOptions, searchPlace },
    focusOnNext: "to",
  },
  to: {
    type: "location",
    options: { defaultLocationOptions, searchPlace },
    focusOnNext: "departureDate",
  },
  departureDate: {
    type: "date",
    focusOnNext: "guests",
    options: { ...dateConfig, minDate: "today" },
  },
  guests: {
    type: "peopleCount",
    defaultValue: [
      {
        name: "adults",
        label: "Adults",
        description: "Ages 13+",
        value: 1,
        min: 0,
        max: 10,
      },
      {
        name: "children",
        label: "Children",
        description: "Ages 4-12",
        value: 0,
        min: 0,
        max: 10,
      },
      {
        name: "infants",
        label: "Infants",
        description: "Under 4 years old",
        value: 0,
        min: 0,
        max: 10,
      },
    ],
  },
}
