import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false)
  const showWhenVisible = { display: isVisible ? '' : 'none' }
  const hideWhenVisible = { display: isVisible ? 'none' : '' }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }
  return (
    <div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}> cancel </button>
      </div>

      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}> {props.buttonLabel} </button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable