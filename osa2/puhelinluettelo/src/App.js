import { useState, useEffect } from 'react'
import axios from 'axios'


const Person = ({name, number}) => {
  return(
    <>
      <p>{name} {number}</p>
    </>
  )
}

const Persons = ({persons, filterName}) =>{
  const personsToShow =  persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
  return (
    <>
    {personsToShow.map(person => 
      <Person key = {person.name} name = {person.name} number = {person.number}/>
      )}
    </>
    
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


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  console.log('render', persons.length, 'persons')

  const addName = (event) => {  
    event.preventDefault()
    if(persons.some(person => person.name === newName)){
      alert(`${newName} is already in phonebook`)
    }
    else{
      const noteObject = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(noteObject))
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
      <Filter filterName = {filterName} handleFilterChange = {handleFilterChange}/>
      
      <h2>Add New Entry</h2>
      <AddPerson addName = {addName} newName = {newName} handleNameChange = {handleNameChange} 
      newNumber = {newNumber} handleNumberChange = {handleNumberChange}/>

      <h2>Numbers</h2>
      <Persons persons = {persons} filterName = {filterName}/>
    </div>
  )

}

export default App