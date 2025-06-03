import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false)
  const showWhenVisible = { display: isVisible ? '' : 'none' }
  const hideWhenVisible = { display: isVisible ? 'none' : '' }
  const style = {
    margin: ' 16px 0',
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }
  return (
    <div style={style}>
      <div style={showWhenVisible}>
        <Button variant="outline-danger" onClick={toggleVisibility}>
          {' '}
          cancel{' '}
        </Button>
        {props.children}
      </div>

      <div style={hideWhenVisible}>
        <Button variant="outline-primary" onClick={toggleVisibility}>
          {' '}
          {props.buttonLabel}{' '}
        </Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
