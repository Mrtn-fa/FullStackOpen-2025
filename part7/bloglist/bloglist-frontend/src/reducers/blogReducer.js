import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    addLikeBlog(state, action) {
      const id = action.payload.id
      return state.map((blog) =>
        blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
      )
    },
    appendComment(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    },
  },
})
export const { setBlogs, appendBlog, removeBlog, addLikeBlog, appendComment } =
  blogSlice.actions
export default blogSlice.reducer

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog, user) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.create(blog)
      const userObj = { ...user, id: createBlog.user }
      const pushBlog = { ...createdBlog, user: userObj }
      dispatch(appendBlog(pushBlog))
      dispatch(
        setNotification(`a new blog ${blog.title} by ${blog.author} added`)
      )
    } catch (error) {
      dispatch(setNotification('an error occured creating a blog', 'danger'))
    }
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const id = blog.id
    const likedBlog = await blogService.update(id, blog)
    dispatch(addLikeBlog(likedBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export const addComment = (blog, content) => {
  return async (dispatch) => {
    try {
      const id = blog.id
      const newComment = await blogService.addComment(id, { content })
      const updatedBlog = {
        ...blog,
        comments: blog.comments.concat(newComment),
      }
      dispatch(appendComment(updatedBlog))
      dispatch(setNotification(`added message '${newComment.content}'`))
    } catch (error) {
      dispatch(
        setNotification('an error occurred submitting the message', 'danger')
      )
    }
  }
}
