

const filterReducer = (state = '', action) => {
    console.log('FILTER ACTION: ', action)
    switch (action.type) {
      case 'CHANGE_FILTER':
        console.log("action payload: " + action.payload)
        return action.payload
      default:
        return state
    }
  }


  export const changeFilter = filter => {
    return {
      type: 'CHANGE_FILTER',
      payload: filter,
    }
  }


  export default filterReducer