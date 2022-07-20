const searchStr = (countries, newSearch) => countries.filter(
  country => country.name.common.toLowerCase().includes((newSearch).toLowerCase()))

export default searchStr