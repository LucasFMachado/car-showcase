'use client'

import Image from 'next/image'
import { useState } from 'react'

import { TCar } from '@/types/Car'
import { calculateRentAmount } from '@/utils'

import { CarDetails, CustomButton } from '.'

interface CarCardProps {
  car: TCar
}

const CarCard = ({ car }: CarCardProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const { city_mpg, year, make, model, transmission, drive } = car

  const rentAmount = calculateRentAmount(city_mpg, year)

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>
      <p className="flex mt-6 text-[32px] font-extrabold">
        <span className="self-start text-[14px] font-semibold">$</span>
        {rentAmount}
        <span className="self-end text-[14px] font-medium">/day</span>
      </p>

      <div className="relative w-full h-40 my-3">
        <Image
          src="/hero.png"
          alt="Car model"
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-gray">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/steering-wheel.svg"
              width={20}
              height={20}
              alt="Steering wheel"
            />
            <p className="text-[14px]">
              {transmission === 'a' ? 'Automatic' : 'Manual'}
            </p>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/tire.svg" width={20} height={20} alt="Tire" />
            <p className="text-[14px]">{drive.toUpperCase()}</p>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/gas.svg" width={20} height={20} alt="Gas" />
            <p className="text-[14px]">{city_mpg} MPG</p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title="View more"
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setModalOpen(true)}
          />
        </div>
      </div>

      <CarDetails
        isOpen={modalOpen}
        onCloseModal={() => setModalOpen(false)}
        car={car}
      />
    </div>
  )
}

export default CarCard
