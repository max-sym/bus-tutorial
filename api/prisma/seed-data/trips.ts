import moment from "moment"

const days = 7
const tripsPerCityPerDay = 3

const getFloorRandom = (min = 0, max: number) =>
  Math.floor(min + Math.random() * (max - min))

const getCitiesExceptOne = ({ cities, city }) => {
  return cities.filter(item => item.id !== city.id)
}

const getTrip = ({ tripIndex, day, cityFrom, cityTo }) => {
  const cityFromId = cityFrom.id
  const cityToId = cityTo.id
  const datetimeBase = moment()
    .add(day, "day")
    .startOf("day")
    .add(tripIndex * 2 + 7, "hour")
    .add(getFloorRandom(0, 50), "minute")
  const departure = datetimeBase.toDate()
  const arrival = datetimeBase.add(getFloorRandom(30, 180), "minute").toDate()
  const price = getFloorRandom(1800, 3600)
  return {
    cityFromId,
    cityToId,
    departure,
    arrival,
    price,
  }
}

export const getFakeTrips = ({ cities }) => {
  const tripsArray = []
  cities.forEach(cityFrom => {
    const otherCities = getCitiesExceptOne({ cities, city: cityFrom })
    for (let day = 0; day < days; day++) {
      for (let tripIndex = 0; tripIndex < tripsPerCityPerDay; tripIndex++) {
        otherCities.forEach(cityTo => {
          const newTrip = getTrip({ tripIndex, day, cityFrom, cityTo })
          tripsArray.push(newTrip)
        })
      }
    }
  })

  return tripsArray
}
