import anecdoteReducer, {setAnecdotes} from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import anecdotesService from './services/anecdotes'

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer,
        notification: notificationReducer
    }
  })

  
anecdotesService.getAll().then(anecdotes =>
    store.dispatch(setAnecdotes(anecdotes))
  )


export default store