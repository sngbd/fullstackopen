import { useState, useEffect } from 'react'
import axios from 'axios'

const Data = ({country}) => {
  const valuesArray = Object.values(country.languages);
  const [weather, setWeather] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=
            ${country.capital[0]}&units=metric&APPID=${api_key}`)
      .then(response => {
        setWeather(response.data)
        setLoading(false)
      })
  })

  if (isLoading) {
    return (
     <div>
     </div> 
    )
  }
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
      <h3>Weather in {country.capital[0]}</h3>
      <p>temperature {weather.main.temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Data