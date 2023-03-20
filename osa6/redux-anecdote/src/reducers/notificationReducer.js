import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    visible: false
  },
  reducers: {
   showNotification: (state, action) => {
        console.log("NOTIFICATION NEW VALUE = " + action.payload.message)
        return{
          ...state,
          message: action.payload.message,
          visible: true
        }
    },
    hideNotification: (state) => {
      return{
        ...state,
        message: null,
        visible: false
      }
    } 
  }
})

export const setNotification = (message, timer)  => (dispatch) => {
  console.log("PÄÄSEKÖ TÄHÄN NÄIN" + message)

  dispatch(notificationSlice.actions.showNotification({ message }))

  setTimeout(() => {
    dispatch(notificationSlice.actions.hideNotification())}, timer * 1000)
    
  }


export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;