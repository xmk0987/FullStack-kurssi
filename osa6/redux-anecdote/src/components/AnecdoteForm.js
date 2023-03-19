import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer';
import { changeNotification } from '../reducers/notificationReducer';


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        console.log("TESTI TÄSSÄ " + content)
        event.target.anecdote.value = ''
        dispatch(changeNotification("YOU ADDED ANECDOTE " + content))
        setTimeout(() => dispatch(changeNotification(null)), 5000)
        dispatch(createAnecdote(content))
  }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name ="anecdote" /></div>
                <button>create</button>
            </form>
        </div>
    )
}


export default AnecdoteForm;