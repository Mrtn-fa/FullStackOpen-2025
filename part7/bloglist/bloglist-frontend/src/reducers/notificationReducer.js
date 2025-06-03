import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  content: '',
  visibility: false,
  type: 'success',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      state.content = action.payload.content
      state.type = action.payload.type
      state.visibility = true
    },
    clearNotification(state, action) {
      state.visibility = false
    },
  },
})

export const { showNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (content, type = 'success', timeout = 5) => {
  return async (dispatch) => {
    const action = { content, type }
    dispatch(showNotification(action))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout * 1000)
  }
}
