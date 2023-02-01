import { useState } from 'react'


const Person = ({name}) => {
  return(
    <>
      <p>{name}</p>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {  
    event.preventDefault()
    if(persons.some(person => person.name === newName)){
      alert(`${newName} is already in phonebook`)
    }
    else{
      const noteObject = {
        name: newName
      }

      setPersons(persons.concat(noteObject))
    }
    
    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName} value = {newName} onChange = {handleNameChange}>
        <div>
          name: <input />
        </div>
        <div>
          <button>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <Person key = {person.name} name = {person.name} />
        )}
      
    </div>
  )

}

export default App