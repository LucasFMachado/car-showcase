import { TCar } from '@/types/Car'

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
