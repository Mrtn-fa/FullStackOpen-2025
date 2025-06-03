import { useDispatch, useSelector } from 'react-redux'
import { addComment, deleteBlog, likeBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'
import { Button, Form, ListGroup } from 'react-bootstrap'

const Blog = ({ blog, single = false }) => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const comment = useField('text')

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5,
  }

  const handleLike = () => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(likeBlog(likedBlog))
  }

  const handleDelete = async () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      const id = blog.id
      dispatch(deleteBlog(id))
      navigate(-1)
    }
  }
  const handleOnComment = (event) => {
    event.preventDefault()
    dispatch(addComment(blog, comment.props.value))
    comment.reset()
  }
  if (!blog) return null
  if (single) {
    return (
      <>
        <h1>
          {blog.title} by {blog.author}
        </h1>
        <a href={blog.url}>{blog.url}</a>
        <div>
          {blog.likes} likes{' '}
          <Button variant="outline-primary" onClick={handleLike}>
            like
          </Button>
        </div>
        <div>added by {blog.user.username}</div>
        {user.username === blog.user.username && (
          <Button variant="outline-danger" onClick={handleDelete}>
            delete
          </Button>
        )}

        <h2>comments</h2>
        <Form onSubmit={handleOnComment} className="mb-4">
          <Form.Group className="d-flex gap-2">
            <Form.Control className="w-25" {...comment.props} />
            <Button variant="outline-primary" type="submit">
              add comment
            </Button>
          </Form.Group>
        </Form>

        {blog.comments.length !== 0 ? (
          <ListGroup>
            {blog.comments.map((comment) => (
              <ListGroup.Item key={comment.id}>
                {comment.content}
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <h3>No comments</h3>
        )}
      </>
    )
  }
  return <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
}

export default Blog
