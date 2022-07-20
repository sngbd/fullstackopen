import { useState, useEffect } from 'react'
import axios from 'axios'
import Display from './Display'
import searchStr from './Search'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }
  
  const matchedCountries = newSearch === '' ? [] : searchStr(countries, newSearch)

  return (
    <div>
      <p>find countries
        <input
          onChange={handleSearchChange}
        />
      </p>
        <Display countries={matchedCountries} />
    </div>
  )
}

export default App
