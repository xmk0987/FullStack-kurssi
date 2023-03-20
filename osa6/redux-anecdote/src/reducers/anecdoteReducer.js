
import { createSlice } from '@reduxjs/toolkit'




const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote: (state, action) => {
      const content  = action.payload
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
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) { return action.payload }
  }
})

export const { createAnecdote, addVote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer