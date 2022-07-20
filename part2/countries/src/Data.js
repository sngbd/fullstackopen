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

export default Data