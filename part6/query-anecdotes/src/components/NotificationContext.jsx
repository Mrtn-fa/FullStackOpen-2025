import { useContext, createContext, useReducer } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return { content: action.payload, visible: true }
    case "HIDE":
      return { ...state, visible: false }
    default:
      return state
  }
}

const NotificationContext = createContext()
const initialValue = { content: '', visible: false }

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, initialValue)

  const showNotification = (content) => {
    notificationDispatch({ type: "SHOW", payload: content })
    setTimeout(() => { notificationDispatch({ type: "HIDE" }) }, 5000)
  }

  return (
    <NotificationContext.Provider value={[notification, showNotification]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext

export const useNotificationValue = () => {
  const [anecdote, showNotification] = useContext(NotificationContext)
  return anecdote
}

export const useNotificationDispatch = () => {
  const [anecdote, showNotification] = useContext(NotificationContext)
  return showNotification
}