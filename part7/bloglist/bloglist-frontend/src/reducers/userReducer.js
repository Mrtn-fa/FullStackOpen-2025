import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'
import blogService from '../services/blogs'

const initialState = null

const userSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    loginUser(state, action) {
      return action.payload
    },
    logoutUser(state, action) {
      window.localStorage.clear()
      return null
    },
  },
})

export const { loginUser, logoutUser } = userSlice.actions
export default userSlice.reducer

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON === null) return
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    dispatch(loginUser(user))
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(loginUser(user))
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'danger'))
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutUser())
  }
}
