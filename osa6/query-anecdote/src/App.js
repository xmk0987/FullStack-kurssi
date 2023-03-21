import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import { useContext } from 'react'
import NotificationContext from './components/notificationContext'
import { useQuery } from 'react-query' 
import { getAnecdotes } from './requests'


const App = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)

  
  const result = useQuery('anecdotes', getAnecdotes, 
    {
        retry: 1
    }
    )
    console.log(result)

    if ( result.isLoading ) {
        return <div>loading data...</div>
    }

    if ( result.isError ) {
        return <div>anecdote service not available due to problems in server</div>
    }

    const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification message = {notification}/>
      <AnecdoteForm />
      <AnecdoteList anecdotes = {anecdotes}/>
    </div>

    
  )
}

export default App