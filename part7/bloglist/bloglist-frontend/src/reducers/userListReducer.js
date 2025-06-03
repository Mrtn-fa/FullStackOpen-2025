import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const initialState = []

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    appendUser(state, action) {
      state.push(action.payload)
    },
  },
})

export const { setUsers, appendUser } = usersSlice.actions
export default usersSlice.reducer

export const initializeUserList = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}
