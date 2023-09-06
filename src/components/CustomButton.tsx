'use client'

import Image from 'next/image'
import { MouseEventHandler } from 'react'

interface CustomButtonProps {
  title: string
  type?: 'button' | 'submit'
  containerStyles?: string
  textStyles?: string
  rightIcon?: string
  disabled?: boolean
  handleClick?: MouseEventHandler<HTMLButtonElement>
}

const CustomButton = ({
  title,
  type = 'button',
  containerStyles,
  textStyles,
  rightIcon,
  disabled,
  handleClick,
}: CustomButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`custom-btn ${containerStyles}`}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>{title}</span>
      {rightIcon && (
        <div className="relative w-6 h-6">
          <Image
            src={rightIcon}
            alt="Button icon"
            fill
            className="object-contain"
          />
        </div>
      )}
    </button>
  )
}

export default CustomButton
