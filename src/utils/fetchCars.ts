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
