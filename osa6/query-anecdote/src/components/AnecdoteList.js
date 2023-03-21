import { updateAnecdote } from '../requests'
import { useMutation, useQueryClient  } from 'react-query' 
import { useContext } from 'react'
import NotificationContext from './notificationContext'


const AnecdoteList = (props) => {
    const anecdotes = props.anecdotes
    console.log(anecdotes)
    const queryClient = useQueryClient()
    const [notification, notificationDispatch] = useContext(NotificationContext)

    const handleVote = (anecdote) => {
        console.log('vote' + anecdote.content)
        const updatedAnecdote = {
          ...anecdote, 
          votes: anecdote.votes +1
        }
        notificationDispatch({ type: "VOTE", content: updatedAnecdote.content })
        voteMutation.mutate(updatedAnecdote)
    
       
      }
    
      const voteMutation = useMutation((updatedAnecdote) => 
        updateAnecdote(updatedAnecdote.id, updatedAnecdote),{
        onSuccess: () => {
          queryClient.invalidateQueries('anecdotes')
        }
      })


    return (
        <div>
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
       
    )

}

export default AnecdoteList