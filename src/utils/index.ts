import { TCar } from '@/types/Car'
import { TFilterCars } from '@/types/Filter'

export async function fetchCars(filters: TFilterCars) {
  const { manufacturer, model, year, fuel, limit } = filters
  const headers = {
    'X-RapidAPI-Key': '6d0e3cd3c6msh18c126052e07a85p15044fjsn23e10284b2b0',
    'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
  }

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&model=${model}&year=${year}&fuel_type=${fuel}&limit=${limit}`,
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
  const url = new URL('https://cdn.imagin.studio/getimage')

  const { make, year, model } = car

  url.searchParams.append('customer', 'hrjavascript-mastery')
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
