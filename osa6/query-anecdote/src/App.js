import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes,  updateAnecdote } from './requests'
import { useQuery, useMutation, useQueryClient  } from 'react-query' 
import { useReducer } from 'react'
import { notificationReducer } from './notificationReducer'
import NotificationContext from './notificationContext'

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer)
  const queryClient = useQueryClient()


  const handleVote = (anecdote) => {
    console.log('vote' + anecdote.content)
    const updatedAnecdote = {
      ...anecdote, 
      votes: anecdote.votes +1
    }
    notificationDispatch({ type: "VOTE", content: updatedAnecdote.content })
    console.log('testi vaihtuuko ' + notification)
    voteMutation.mutate(updatedAnecdote)

   
  }

  const voteMutation = useMutation((updatedAnecdote) => 
    updateAnecdote(updatedAnecdote.id, updatedAnecdote),{
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })


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
    <NotificationContext.Provider value = {[notification, notificationDispatch]}>
      <div>
        <h3>Anecdote app</h3>
      
        <Notification message = {notification}/>
        <AnecdoteForm />
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>

    </NotificationContext.Provider>
    
  )
}

export default App