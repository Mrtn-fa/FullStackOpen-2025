import { useSelector } from "react-redux"


const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    display: notification.visibility ? 'block' : 'none',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification.content}
    </div>
  )
}

export default Notification