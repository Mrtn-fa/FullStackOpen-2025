import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const style = {
    display: notification.visibility ? 'block' : 'none',
  }
  return (
    <div className="container" style={style}>
      <Alert variant={notification.type}>{notification.content}</Alert>
    </div>
  )
}

export default Notification
