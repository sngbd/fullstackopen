import Data from "./Data"
import Show from "./Show"

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
          {country.name.common} <Show country={country} />
        </li>
      )
    })
  )
}

export default Display