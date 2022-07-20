import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({person}) => {
return (
  <li key={person.id}>{person.name} {person.number}</li>
)}

const searchStr = (persons, newSearch) => persons.filter(
  person => person.name.toLowerCase().includes((newSearch).toLowerCase())
  )

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()
    if (!persons.some(p => p.name === newName)) {
      const personObject = {
        name: newName,
        number: newNumber
      }
      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          console.log(response)
        })
        .catch(e => {
          console.log(e);
        });
      
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
    else {
      alert(`${newName} is already added to phonebook`)
    }
  }
  
  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <p>filter shown with
        <input
        onChange={handleSearchChange}
        />
      </p>
      <h3>Add a new</h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
        {searchStr(persons, newSearch).map(person =>
          <Person key={person.name} person={person} />
        )}
    </div>
  )
}

export default App