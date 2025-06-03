import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const BlogForm = () => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleSubmit = (event) => {
    event.preventDefault()
    const blog = {
      title: title.props.value,
      author: author.props.value,
      url: url.props.value,
      likes: 0,
    }
    dispatch(createBlog(blog, user))
    title.reset()
    author.reset()
    url.reset()
  }
  return (
    <Form onSubmit={handleSubmit}>
      <h4>Create a new blog entry</h4>
      <Form.Group>
        <Form.Label>title</Form.Label>
        <Form.Control {...title.props}></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>author</Form.Label>
        <Form.Control {...author.props}></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>url</Form.Label>
        <Form.Control {...url.props}></Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        create
      </Button>
    </Form>
  )
}

export default BlogForm
