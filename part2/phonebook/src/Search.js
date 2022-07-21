const searchStr = (persons, newSearch) => persons.filter(
  person => person.name.toLowerCase().includes((newSearch).toLowerCase())
  )

export default searchStr