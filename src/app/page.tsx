import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components'
import { fuels, yearsOfProduction } from '@/constants'
import { TCar } from '@/types/Car'
import { TFilterCars } from '@/types/Filter'
import { fetchCars } from '@/utils/fetchCars'

interface HomeProps {
  searchParams: TFilterCars
}

export default async function Home({ searchParams }: HomeProps) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    model: searchParams.model || '',
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 10,
  })
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home_text_container">
          <h1 className="text-4xl font-extrabold">Car Catalog</h1>
          <p>Explore the cars you might like</p>

          <div className="home_filters">
            <SearchBar />

            <div className="home_filter_container">
              <CustomFilter title="fuel" options={fuels} />
              <CustomFilter title="year" options={yearsOfProduction} />
            </div>
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home_cars_wrapper">
              {allCars?.map((car: TCar, index) => (
                <CarCard key={index} car={car} />
              ))}
            </div>

            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isLastPage={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className="home_error_container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  )
}
