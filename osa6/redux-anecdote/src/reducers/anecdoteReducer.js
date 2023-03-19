
import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote: (state, action) => {
      const content  = asObject(action.payload)
      console.log(content)
      state.push(content)
    },
    addVote: (state, action) => {
      const id = action.payload
      console.log("ID TÄS " + id)
      const wantedAnectode = state.find(a => a.id === id)
      const changedAnectode = {
        ...wantedAnectode,
        votes : wantedAnectode.votes + 1
      }
      return state.map(anectode => anectode.id !== id ? anectode : changedAnectode)
    }
  }
})

export const { createAnecdote, addVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer