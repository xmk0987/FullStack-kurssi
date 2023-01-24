import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

function mostVoted(array) {
  return array.indexOf(Math.max(...array))
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [points, setPoints] = useState(new Uint8Array(8))

  const [selected, setSelected] = useState(0)

  const handleButtonClick = () => {
    let randomNumber = Math.floor(Math.random()*anecdotes.length)
    while(selected === randomNumber){
      randomNumber = Math.floor(Math.random()*anecdotes.length)
    }
    setSelected(randomNumber)
  }

  const handleVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy) 
  }

  var indexOfMax = mostVoted(points)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>This anecdote has {points[selected]} votes</p>
      <Button handleClick={handleButtonClick} text='next anecdote'/>
      <Button handleClick={handleVoteClick} text='vote'/>
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[indexOfMax]}</p>
      <p>This anecdote has {points[indexOfMax]} votes</p>
    </div>
  )
}

export default App
