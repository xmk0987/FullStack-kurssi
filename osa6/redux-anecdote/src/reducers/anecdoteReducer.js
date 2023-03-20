import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from '../services/anecdoteService'



const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
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
    setAnecdotes(state, action) { 
      (console.log("ASETTAA OIKEIN " + action.payload))
      return action.payload
     }
  },
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    console.log("AINAKIN HAKEE NÄÄ" + anecdotes)
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))

  }
}


export const { addVote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions


export default anecdoteSlice.reducer


