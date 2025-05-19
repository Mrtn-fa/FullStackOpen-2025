import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  content: '',
  visibility: false
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      state.content = action.payload
      state.visibility = true
    },
    clearNotification(state, action) {
      state.visibility = action.payload
    }
  }
})

export const { showNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (message, timeout = 5) => {
  return async dispatch => {
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout * 1000)
  }
}