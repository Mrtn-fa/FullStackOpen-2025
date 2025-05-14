import { useState } from 'react'

const Blog = ({ blog, onLike, user, onDelete }) => {
  const [isVisible, setIsVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showWhenVisible = { display: isVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const handleLike = async () => {
    await onLike(blog)
  }

  const handleDelete = async () => {
    await onDelete(blog)
  }

  return (
    <div className='blog-data' style={blogStyle}>
      <div>
        <div>{blog.title} {!isVisible ? blog.author : ''} <button onClick={toggleVisibility}> show </button></div>
        {isVisible ? (<div style={showWhenVisible}>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button className='like-blog' onClick={handleLike}> like </button></div>
          <div>{blog.author}</div>
          {user.username === blog.user.username && <button onClick={handleDelete}> delete </button>}
        </div>) : <></>}
      </div>
    </div>
  )
}

export default Blog