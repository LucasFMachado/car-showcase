import { TCar } from '@/types/Car'
import { TFilterCars } from '@/types/Filter'

export async function fetchCars(filters: TFilterCars) {
  const apiKey = process.env.NEXT_PUBLIC_CARS_API_KEY as string
  const apiHost = process.env.NEXT_PUBLIC_CARS_API_HOST as string
  const apiUrl = process.env.NEXT_PUBLIC_CARS_API_URL as string

  const { manufacturer, model, year, fuel, limit } = filters
  const headers = {
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': apiHost,
  }

  const response = await fetch(
    `${apiUrl}/cars?make=${manufacturer}&model=${model}&year=${year}&fuel_type=${fuel}&limit=${limit}`,
    {
      headers,
    },
  )

  const result = await response.json()
  return result
}

export const calculateRentAmount = (city_mpg: number, year: number) => {
  const basePricePerDay = 50 // Base rental price per day in dollars
  const mileageFactor = 0.1 // Additional rate per mile driven
  const ageFactor = 0.05 // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor
  const ageRate = (new Date().getFullYear() - year) * ageFactor

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate

  return rentalRatePerDay.toFixed(0)
}

export const generateCarImageUrl = (car: TCar, angle?: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_IMAGES_API_URL as string
  const apiKey = process.env.NEXT_PUBLIC_IMAGES_API_KEY as string

  const url = new URL(`${apiUrl}/getimage`)
  const { make, year, model } = car

  url.searchParams.append('customer', apiKey)
  url.searchParams.append('make', make)
  url.searchParams.append('modelFamily', model.split(' ')[0])
  url.searchParams.append('zoomType', 'fullscreen')
  url.searchParams.append('modelYear', year.toString())
  url.searchParams.append('angle', angle || '')

  return url.toString()
}

export const updateSearchParams = (title: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search)
  searchParams.set(title, value)
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`
  return newPathname
}
