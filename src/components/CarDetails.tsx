'use client'

import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment } from 'react'

import { TCar } from '@/types/Car'
import { generateCarImageUrl } from '@/utils/generateCarImageUrl'

interface CarDetailsProps {
  isOpen: boolean
  onCloseModal: () => void
  car: TCar
}

const CarDetails = ({ isOpen, onCloseModal, car }: CarDetailsProps) => {
  return (
    <>
      <Transition as={Fragment} appear show={isOpen}>
        <Dialog as="div" onClose={onCloseModal} className="relative z-10">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="car_details_dialog_panel">
                  <button
                    type="button"
                    onClick={onCloseModal}
                    className="car_details_close_btn"
                  >
                    <Image
                      src="/close.svg"
                      alt="Close dialog image"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </button>

                  <div className="flex-1 flex flex-col gap-3">
                    <div className="car_details_main_image_content">
                      <Image
                        src={generateCarImageUrl(car)}
                        alt="Car model"
                        fill
                        priority
                        className="object-contain"
                      />
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-1 relative w-full h-24 bg-gray-100 rounded-lg">
                        <Image
                          src={generateCarImageUrl(car, '29')}
                          alt="Car model"
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1 relative w-full h-24 bg-gray-100 rounded-lg">
                        <Image
                          src={generateCarImageUrl(car, '33')}
                          alt="Car model"
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1 relative w-full h-24 bg-gray-100 rounded-lg">
                        <Image
                          src={generateCarImageUrl(car, '13')}
                          alt="Car model"
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <h2 className="font-semibold text-xl capitalize">
                      {car.make} {car.model}
                    </h2>

                    <div className="mt-3 flex flex-wrap gap-4">
                      {Object.entries(car).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between gap-5 w-full text-right"
                        >
                          <h4 className="text-gray-500 capitalize">
                            {key.split('_').join(' ')}
                          </h4>
                          <p className="text-slate-900 font-semibold">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default CarDetails
