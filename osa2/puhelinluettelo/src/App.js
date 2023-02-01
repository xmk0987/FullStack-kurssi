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
    { name: 'Arto Hellas' ,
      number: '040-1231244'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const addName = (event) => {  
    console.log(persons)
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form  onSubmit={addName}  >
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
      {persons.map(person => 
        <Person key = {person.name} name = {person.name} number = {person.number}/>
        )}
      
    </div>
  )

}

export default App