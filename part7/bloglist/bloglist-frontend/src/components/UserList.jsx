import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, ListGroup } from 'react-bootstrap'
import Blog from './Blog'

export const User = ({ user, single = false }) => {
  if (!user) {
    return null
  }
  if (single) {
    return (
      <div>
        <h1>{user.name}</h1>
        <h3>added blogs</h3>
        <ListGroup>
          {user.blogs.map((blog) => (
            <ListGroup.Item key={blog.id}>
              {' '}
              <Blog blog={blog} />{' '}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    )
  }
  return (
    <tr key={user.id}>
      <td>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

const UserList = () => {
  const userList = useSelector((state) => state.userList)
  return (
    <div>
      <h1>Users</h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>
              <b>User name</b>
            </th>
            <th>
              <b>blogs created</b>
            </th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList
