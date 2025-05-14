import { useState } from 'react'

const BlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await onSubmit({ author, title, url })
    } catch (exception) {
      console.error(exception)
    } finally {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">title:</label>
        <input id='blog-title' name='title' value={title} onChange={({ target }) => setTitle(target.value)} />
      </div>

      <div>
        <label htmlFor="author">author:</label>
        <input id='blog-author' name='author' value={author} onChange={({ target }) => setAuthor(target.value)} />
      </div>

      <div>
        <label htmlFor="url">url:</label>
        <input id='blog-url' name='url' value={url} onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button id='blog-submit' type="submit">create</button>
    </form>
  )
}

export default BlogForm