import { useDispatch } from 'react-redux'
import { filterAction } from '../reducers/filterReducer'


const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    const content = event.target.value
    dispatch(filterAction(content))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter