'use client'

import { Listbox, Transition } from '@headlessui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Fragment, useState } from 'react'

import { TFilterOption } from '@/types/Filter'
import { updateSearchParams } from '@/utils/updateSearchParams'

interface CustomFilterProps {
  title: string
  options: TFilterOption[]
}

const CustomFilter = ({ title, options }: CustomFilterProps) => {
  const router = useRouter()
  const [selected, setSelected] = useState(options[0])

  const handleUpdateParams = (e: { value: string }) => {
    const newPathname = updateSearchParams(title, e.value.toLocaleLowerCase())
    router.push(newPathname, { scroll: false })
  }

  return (
    <div className="w-fit">
      <Listbox
        value={selected}
        onChange={e => {
          setSelected(e)
          handleUpdateParams(e)
        }}
      >
        <div className="relative w-fit z-10">
          <Listbox.Button className="custom_filter_btn">
            <span className="block truncate">{selected.title}</span>
            <Image
              src="/chevron-up-down.svg"
              width={20}
              height={20}
              className="ml-4 object-contain"
              alt="Chevron up and down"
            />
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="custom_filter_options">
              {options.map(option => (
                <Listbox.Option
                  key={option.title}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? 'bg-blue-600 text-white' : 'text-gray-900'
                    }`
                  }
                >
                  {({ selected }) => (
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {option.title}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CustomFilter
