import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''


        dispatch(setNotification(`you added ${content}`, 4))

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