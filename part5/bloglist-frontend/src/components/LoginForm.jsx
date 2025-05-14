import { useState } from 'react'

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await onSubmit({ username, password })
    } catch (exception) {
      console.error(exception)
    } finally {
      setUsername('')
      setPassword('')
    }
  }

  return (
    <form id='login-form' onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">username</label>
        <input id='username' name='username' value={username} onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input id='password' name='password' type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm