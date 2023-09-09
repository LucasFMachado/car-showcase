'use client'

import Image from 'next/image'

import { CustomButton } from '.'

const Hero = () => {
  const handleScroll = () => {}

  return (
    <div className="hero_container">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero_title">
          Find, book or rent a car - quickly and easly!
        </h1>

        <p className="hero_subtitle">
          Streamline your car rental experience with our effortless booking
          process.
        </p>

        <CustomButton
          title="Expore cars"
          containerStyles="bg-blue-600 text-white rounded-full mt-10"
          handleClick={handleScroll}
        />
      </div>

      <div className="hero_image_container">
        <div className="hero_image">
          <Image
            src="/hero.png"
            alt="Hero banner"
            fill
            className="object-contain"
          />
        </div>
        <div className="hero_image_overlay" />
      </div>
    </div>
  )
}

export default Hero
