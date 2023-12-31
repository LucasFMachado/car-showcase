'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

import { SearchManufactorer } from '.'

const SearchButton = ({ otherClasses }: { otherClasses?: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src="/magnifying-glass.svg"
      alt="Magnifying glass"
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
)

const SearchBar = () => {
  const router = useRouter()
  const [manufacturer, setManufacturer] = useState('')
  const [model, setModel] = useState('')

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (manufacturer === '' && model === '') {
      return alert('Please fill in the search bar.')
    }

    updateSearchParams(
      manufacturer.toLocaleLowerCase(),
      model.toLocaleLowerCase(),
    )
  }

  const updateSearchParams = (manufacturer: string, model: string) => {
    const searchParams = new URLSearchParams(window.location.search)

    if (manufacturer) {
      searchParams.set('manufacturer', manufacturer)
    } else {
      searchParams.delete('manufacturer')
    }

    if (model) {
      searchParams.set('model', model)
    } else {
      searchParams.delete('model')
    }

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`
    router.push(newPathname, { scroll: false })
  }

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar_item">
        <SearchManufactorer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>

      <div className="searchbar_item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="Car model"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={e => setModel(e.target.value)}
          placeholder="Tiguan"
          className="searchbar_input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  )
}

export default SearchBar
