import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { login } from '../reducers/userReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const credentials = {
      username: username.props.value,
      password: password.props.value,
    }
    dispatch(login(credentials))
    username.reset()
    password.reset()
  }

  return (
    <>
      <h1>log in to application</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control {...username.props}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control {...password.props}></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          login
        </Button>
      </Form>
    </>
  )
}

export default LoginForm
