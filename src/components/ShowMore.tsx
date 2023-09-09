'use client'

import { useRouter } from 'next/navigation'

import { updateSearchParams } from '@/utils/updateSearchParams'

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
    router.push(newPathname, { scroll: false })
  }

  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isLastPage && (
        <CustomButton
          title="Show More"
          containerStyles="bg-blue-600 rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  )
}

export default ShowMore
