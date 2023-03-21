

export const notificationReducer = (state, action)=> {
    switch(action.type){
      case "ADD":
        return `Added anecdote: ${action.content}`
      case "VOTE":
        return `Voted anecdote: ${action.content}`
      default:
        return null
    }
  }
