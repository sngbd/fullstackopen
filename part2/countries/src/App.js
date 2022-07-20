import { useState, useEffect } from 'react'
import axios from 'axios'

const Data = ({country}) => {
  const valuesArray = Object.values(country.languages);
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
      </div>
      <b>languages:</b>
      <ul>
        {
          valuesArray.map(value => {
            return (
              <li key={value}>
                {value}
              </li>
            )
          })
        }
      </ul> 
      <img src={country.flags.png} alt="flag"></img>
    </div>
  )
}

const Display = ({countries}) => {
  if (countries.length === 1) {
    return (<Data country={countries[0]} />)
  }
  
  if (countries.length > 10) {
    return (<p>Too many matches, specify another filter</p>)
  }

  return (
    countries.map(country => {
      return (
        <li key={country.name.common} style={{listStyleType: "none"}}>
          {country.name.common}
        </li>
      )
    })
  )
}

const searchStr = (countries, newSearch) => countries.filter(
  country => country.name.common.toLowerCase().includes((newSearch).toLowerCase()))

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
