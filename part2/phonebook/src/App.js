import { useState } from 'react'
import searchStr from './Search'
import Person from './Person'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  
  personService
    .getAll()
    .then(persons => {
      setPersons(persons)
    })

  const addPerson = (event) => {
    event.preventDefault()
    if (!persons.some(p => p.name === newName)) {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .add(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
    else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const deletePerson = (person) => {
    const msg = `Delete ${person.name}?`
    const confirm = window.confirm(msg)
    if (confirm) {
      personService
        .del(person.id)
        .then(persons =>
          setPersons(persons)
    )}
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
        {
          searchStr(persons, newSearch).map(person =>
            <Person 
              key={person.name} 
              person={person} 
              delQuery={() => deletePerson(person)}
            />
          )
        }
    </div>
  )
}

export default App