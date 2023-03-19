import { createSlice } from '@reduxjs/toolkit'


const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState ,
  reducers: {
    changeNotification: (state, action) => {
        console.log("NOTIFICATION NEW VALUE = " + action.payload)
        return action.payload
      }
  }
})

export const { changeNotification } = notificationSlice.actions
export default notificationSlice.reducer