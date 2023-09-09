export const updateSearchParams = (title: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search)
  searchParams.set(title, value)
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`
  return newPathname
}
