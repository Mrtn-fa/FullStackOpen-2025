import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationType, setNotificationType] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON === null) return
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    blogService.setToken(user.token)
  }, [])

  const onLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      showNotification('wrong username or password', 'error')
    }
  }

  const onLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const onBlogSubmit = async (blogData) => {
    try {
      const newBlog = await blogService.create(blogData)
      setBlogs(blogs.concat(newBlog))
      showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (exception) {
      console.error(exception)
      showNotification('an error occured creating a blog', 'error')
    }
  }

  const showNotification = (message, type = 'success') => {
    setNotificationMessage(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const onBlogLike = async (blog) => {
    try {
      const updateData = { ...blog, user: blog.user.id, likes: blog.likes + 1 }
      const updatedBlog = await blogService.update(blog.id, updateData)
      setBlogs(prevBlogs =>
        prevBlogs
          .map(b => b.id === blog.id ? { ...b, likes: updatedBlog.likes } : b)
          .sort((a, b) => b.likes - a.likes)
      )
    } catch (exception) {
      console.error(exception)
    }
  }

  const onBlogDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id)
        const newBlogs = blogs.filter(b => b.id !== blog.id)
        setBlogs(newBlogs)
      } catch (exception) {
        console.error(exception)
      }
    }
  }

  return (
    <div>
      {!user ? <h1> log in to application</h1> : <h1> blogs </h1>}
      <Notification message={notificationMessage} type={notificationType} />
      {!user && <LoginForm onSubmit={onLogin} />}
      {user &&
        <div>
          <p>{user.name} logged in <button onClick={onLogout}> logout </button></p>
          <Togglable buttonLabel='new blog'>
            <BlogForm onSubmit={onBlogSubmit} />
          </Togglable>
          <BlogList blogList={blogs} onBlogLike={onBlogLike} user={user} onBlogDelete={onBlogDelete} />
        </div>
      }
    </div>
  )
}

export default App