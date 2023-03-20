import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from '../services/anecdoteService'



const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote: (state, action) => {
      const id = action.payload
      console.log("ID TÄS " + id)
      const wantedAnecdote = state.find(a => a.id === id)
      const changedAnecdote = {
        ...wantedAnecdote,
        votes : wantedAnecdote.votes + 1
      }
      return state.map(anectode => anectode.id !== id ? anectode : changedAnecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) { 
      return action.payload
     },
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

export const updateVote = anectode => {
  console.log("UPDATEN SISÄL " + anectode.id)
  return async dispatch => {
    const changedAnectode = {
      ...anectode,
      votes : anectode.votes + 1
    }
    console.log("UPDATEN SISÄL 2 " + changedAnectode)
    const updatedAnecdote = await anecdoteService.changeVote(anectode.id, changedAnectode)
    dispatch(addVote(updatedAnecdote.id))
  }
}




export const { addVote,appendAnecdote, setAnecdotes} = anecdoteSlice.actions


export default anecdoteSlice.reducer


