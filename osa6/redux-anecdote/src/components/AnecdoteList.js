import { useSelector, useDispatch } from 'react-redux'
import {addVote} from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(state => 
        state.anecdotes.filter(anecdote => 
            anecdote.content.toLowerCase().includes(state.filter.toLowerCase())))


    const dispatch = useDispatch()


    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(changeNotification("YOU VOTED ANECDOTE " + anecdote.content))
        setTimeout(() => dispatch(changeNotification(null)), 5000)
        dispatch(addVote(anecdote.id))
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