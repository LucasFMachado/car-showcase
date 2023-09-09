'use client'

import Image from 'next/image'
import { useState } from 'react'

import { TCar } from '@/types/Car'
import { calculateRentAmount } from '@/utils/calculateRentAmount'
import { generateCarImageUrl } from '@/utils/generateCarImageUrl'

import { CarDetails, CustomButton } from '.'

interface CarCardProps {
  car: TCar
}

const CarCard = ({ car }: CarCardProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const { city_mpg, year, make, model, transmission, drive } = car

  const rentAmount = calculateRentAmount(city_mpg, year)

  return (
    <div className="car_card group">
      <div className="car_card_content">
        <h2 className="car_card_content_title">
          {make} {model}
        </h2>
      </div>
      <p className="car_card_price_content">
        <span className="car_card_price_currency">$</span>
        {rentAmount}
        <span className="car_card_price_day">/day</span>
      </p>

      <div className="car_card_image_content">
        <Image
          src={generateCarImageUrl(car)}
          alt="Car model"
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="relative flex w-full mt-2">
        <div className="car_card_icon_content">
          <div className="car_card_icon">
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

          <div className="car_card_icon">
            <Image src="/tire.svg" width={20} height={20} alt="Tire" />
            <p className="text-[14px]">{drive.toUpperCase()}</p>
          </div>

          <div className="car_card_icon">
            <Image src="/gas.svg" width={20} height={20} alt="Gas" />
            <p className="text-[14px]">{city_mpg} MPG</p>
          </div>
        </div>

        <div className="car_card_btn_content">
          <CustomButton
            title="View more"
            containerStyles="w-full py-[16px] rounded-full bg-blue-600"
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
