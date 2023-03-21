import { createContext, useReducer } from 'react'
import { useEffect } from 'react'

export const notificationReducer = (state, action)=> {
    switch(action.type){
      case "ADD":
        return `Added anecdote: ${action.content}`
      case "VOTE":
        return `Voted anecdote: ${action.content}`
      case "CLEAR":
        return null
      default:
        return null
    }
  }


const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  
    useEffect(() => {
      if (notification !== null) {
        const timer = setTimeout(() => {
          notificationDispatch({ type: "CLEAR" })
        }, 5000)
        
        return () => clearTimeout(timer)
      }
    }, [notification])

    return (
      <NotificationContext.Provider value={[notification, notificationDispatch] }>
        {props.children}
      </NotificationContext.Provider>
    )
  }

export default NotificationContext