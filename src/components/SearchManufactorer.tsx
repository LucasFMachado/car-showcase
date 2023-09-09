'use client'

import { Combobox, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment, useState } from 'react'

import { manufacturers } from '@/constants'

interface SearchManufactorerProps {
  manufacturer: string
  setManufacturer: (manufacturer: string) => void
}

const SearchManufactorer = ({
  manufacturer,
  setManufacturer,
}: SearchManufactorerProps) => {
  const [query, setQuery] = useState('')

  const filteredManufacturers =
    query === ''
      ? manufacturers
      : manufacturers.filter(item =>
          item
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        )

  return (
    <div className="search_manufacturer">
      <Combobox value={manufacturer} onChange={setManufacturer}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src="/car-logo.svg"
              width={20}
              height={20}
              className="ml-4"
              alt="Car logo"
            />
          </Combobox.Button>

          <Combobox.Input
            className="search_manufacturer_input"
            placeholder="Volkswagen"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={e => setQuery(e.target.value)}
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options>
              {filteredManufacturers.map(item => (
                <Combobox.Option
                  key={item}
                  value={item}
                  className={({ active }) =>
                    `search_manufacturer_option ${
                      active ? 'bg-blue-600 text-white' : 'text-gray-900'
                    }`
                  }
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item}
                      </span>

                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-pribg-primary-purple'
                          }`}
                        ></span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}

export default SearchManufactorer
