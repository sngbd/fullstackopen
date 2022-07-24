import { useEffect, useState } from 'react'
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
  const [isError, setIsError] = useState(false)
  
  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    for (let p in persons) {
      if (persons[p].name === newName) {
        personObject["id"] = persons[p].id
        return updatePerson(persons[p].id, personObject)
      }
    }

    personService
      .add(personObject)
      .then(person => {
        setPersons(persons.concat(person))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${newName}`)
        setTimeout(() => {
          setMessage('')
        }, 5000)
      })
      .catch((error) => {
        setIsError(true)
        setMessage(error.response.data.error)
        setTimeout(() => {
          setMessage('')
          setIsError(false)
        }, 5000)
      })
  }

  const deletePerson = (person) => {
    const msg = `Delete ${person.name}?`
    const confirm = window.confirm(msg)
    if (confirm) {
      setMessage(`Deleted ${person.name}'s number`)
      setTimeout(() => {
        setMessage('')
      }, 5000)
      personService
        .del(person.id)
        .catch((error) => {
          setPersons(persons.filter(p => person.id !== p.id))
          setNewName('')
          setNewNumber('')
          setIsError(true)
          setMessage(`${person.name} was already deleted from server`)
          setTimeout(() => {
            setMessage('')
            setIsError(false)
          }, 5000)
        })
      setPersons(persons.filter(p => person.id !== p.id))
    }
  }
  
  const updatePerson = (id, person) => {
    const msg = `${person.name} is already added to the phonebook, replace the old number with a new one?`
    const confirm = window.confirm(msg)
    if (confirm) {
      personService
        .update(id, person)
        .then(person => {
          setMessage(`Updated ${person.name}'s number`)
          setPersons(persons.map(p => p.id !== id ? p : person))
          setTimeout(() => {
            setMessage('')
          }, 5000)
        }
        )
        .catch((error) => {
          setIsError(true)
          setMessage(error.response.data.error)
          setTimeout(() => {
            setMessage('')
            setIsError(false)
          }, 5000)
        })
      }
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError} />
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