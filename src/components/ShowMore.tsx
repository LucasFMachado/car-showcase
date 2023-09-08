'use client'

import { useRouter } from 'next/navigation'

import { updateSearchParams } from '@/utils'

import { CustomButton } from '.'

interface ShowMoreProps {
  pageNumber: number
  isLastPage: boolean
}

const ShowMore = ({ pageNumber, isLastPage }: ShowMoreProps) => {
  const router = useRouter()

  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 10
    const newPathname = updateSearchParams('limit', String(newLimit))
    router.push(newPathname)
  }

  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isLastPage && (
        <CustomButton
          title="Show More"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  )
}

export default ShowMore