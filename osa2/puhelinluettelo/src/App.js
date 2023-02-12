import { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({person, deleteNameOf}) => {
  return(
    <li key="{person.id}">
      {person.name} {person.number}
      <button onClick={deleteNameOf}>DELETE</button>
    </li>
    
  )
}

const AddPerson = ({addName, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return(
    <form  onSubmit={addName}  >
      <p>name: <input value = {newName} onChange = {handleNameChange}/></p>
      <p>number: <input value = {newNumber} onChange = {handleNumberChange}/></p>
      <p><button type="submit">add</button></p>
    </form>
  )
}

const Filter = ({filterName, handleFilterChange}) => {
  return(
    <p>filter shown with: <input value = {filterName} onChange = {handleFilterChange}/></p>
  )
  
}

const Notification = ({message}) => {
  if(message === null){
    return null
  }
  return (
    <div className = "error">
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
 

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addName = (event) => {  
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newNumber
    }
    if(persons.some(person => person.name === newName)){
      if(window.confirm(`${newName} is already in phonebook, replace the old number with a new one?`)){
        const wantedPerson = persons.find(person => person.name === newName)
        personService.update(wantedPerson.id, noteObject).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== wantedPerson.id ? person : returnedPerson))
        })
        setErrorMessage(`Updated phone number for ${wantedPerson.name}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
    else{
      personService
      .create(noteObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
      setErrorMessage(`Added ${newName}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteNameOf = async id => {
    const wantedPerson = persons.find(person => person.id === id)
    console.log(wantedPerson)
    if(window.confirm(`Do you really want to delete ${wantedPerson.name}`)){
      await personService.deleteName(id)
      setPersons(persons.filter((person) => {
      return person.id !== id;
    }))
    setErrorMessage(`Deleted ${wantedPerson.name}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>

      <Filter filterName = {filterName} handleFilterChange = {handleFilterChange}/>
      
      <h2>Add New Entry</h2>
      <AddPerson addName = {addName} newName = {newName} handleNameChange = {handleNameChange} 
      newNumber = {newNumber} handleNumberChange = {handleNumberChange}/>

      <h2>Numbers</h2>
      <ul>
        {persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())).map(person =>
          <Person 
          key = {person.id} 
          person = {person} 
          deleteNameOf = {() => deleteNameOf(person.id)}/>
          )}
      </ul>
      
    </div>
  )

}

export default App