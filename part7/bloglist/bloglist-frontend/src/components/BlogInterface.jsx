import BlogForm from './BlogForm'
import BlogList from './BlogList'
import Togglable from './Togglable'

const BlogInterface = () => {
  return (
    <>
      <h1>Blogs</h1>
      <Togglable buttonLabel="new blog">
        <BlogForm />
      </Togglable>
      <BlogList />
    </>
  )
}

export default BlogInterface
