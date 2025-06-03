import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logout } from './reducers/userReducer'
import { initializeUserList } from './reducers/userListReducer'
import UserList, { User } from './components/UserList'

import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'
import BlogInterface from './components/BlogInterface'
import Blog from './components/Blog'
import { createSelector } from '@reduxjs/toolkit'
import { Button } from 'react-bootstrap'

const Menu = (props) => {
  const selectBlogs = (state) => state.blogs
  const selectUser = (state) => state.userList

  const selectBlogListUser = createSelector(
    [selectBlogs, selectUser],
    (blogList, userList) => {
      return { blogList, userList }
    }
  )
  const { blogList, userList } = useSelector((state) =>
    selectBlogListUser(state)
  )

  const padding = {
    paddingRight: 5,
  }
  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')
  const user = userMatch
    ? userList.find((u) => u.id === userMatch.params.id)
    : null

  const blog = blogMatch
    ? blogList.find((u) => u.id === blogMatch.params.id)
    : null
  return (
    <div>
      <div className="navigation-container">
        <Link style={padding} to="/">
          <Button variant="link">blogs</Button>
        </Link>
        <Link style={padding} to="/users">
          <Button variant="link">users</Button>
        </Link>
        {props.children}
      </div>
      <Routes>
        <Route path="/" element={<BlogInterface />}></Route>
        <Route path="/users" element={<UserList />}></Route>
        <Route path="/users/:id" element={<User user={user} single />}></Route>
        <Route path="/blogs/:id" element={<Blog blog={blog} single />}></Route>
      </Routes>
    </div>
  )
}

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUserList())
  }, [dispatch])

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="container">
      <Notification />
      {user && (
        <Menu>
          <b>{user.name} logged in</b>{' '}
          <Button variant="secondary" onClick={onLogout}>
            {' '}
            logout{' '}
          </Button>
        </Menu>
      )}
      {!user && <LoginForm />}
    </div>
  )
}

export default App
