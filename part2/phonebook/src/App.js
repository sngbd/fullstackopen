import { useState } from 'react'
import searchStr from './Search'
import Person from './Person'
import personService from './services/persons'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState('')
  
  personService
    .getAll()
    .then(persons => {
      setPersons(persons)
    })

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    for (let p in persons) {
      if (persons[p].name === newName) {
        personObject["id"] = persons[p].id
        setMessage(`Updated ${newName}'s number`)
        setTimeout(() => {
          setMessage('')
        }, 5000)
        return updatePerson(persons[p].id, personObject)
      }
    }
    setMessage(`Added ${newName}`)
    setTimeout(() => {
      setMessage('')
    }, 5000)
    personService
      .add(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
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
  
  const updatePerson = (id, person) => {
    const msg = `${person.name} is already added to the phonebook, replace the old number with a new one?`
    const confirm = window.confirm(msg)
    if (confirm) {
      personService
        .update(id, person)
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
      <Notification message={message} />
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