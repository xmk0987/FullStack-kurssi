import { useState } from 'react'


const Person = ({name, number}) => {
  console.log(name)
  console.log(number)
  return(
    <>
      <p>{name} {number}</p>
    </>
  )
}



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilter] = useState('')

  

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

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))


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
      <form  onSubmit={addName}  >

        <div>filter shown with: <input value = {filterName} onChange = {handleFilterChange}/></div>
        <h2>Add New Entry</h2>
        <div>
          name: <input value = {newName} onChange = {handleNameChange}/>
        </div>
        <div>
          number: <input value = {newNumber} onChange = {handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => 
        <Person key = {person.name} name = {person.name} number = {person.number}/>
        )}
      
      
    </div>
  )

}

export default App