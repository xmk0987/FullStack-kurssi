import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { updateVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state =>

        state.anecdotes.filter(anecdote => 
            anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
)
        

    const dispatch = useDispatch()


    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(setNotification(`you voted ${anecdote.content}`, 2))
  
        console.log("MIKÄS TÄÄ ON " + anecdote.content)
        dispatch(updateVote(anecdote))
    }

    return ( 
        <div>
            {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
            )}
        </div>
    )
}

export default AnecdoteList