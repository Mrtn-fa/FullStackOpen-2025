import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const vote = () => {
    console.log('vote')
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
  }

  return (
    <>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes} <button onClick={vote}>vote</button>
      </div>
    </>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    const filteredAnecdotes = [...state.anecdotes].filter(anecdote => anecdote.content.includes(state.filter))
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
  })

  return (
    anecdotes.map(anecdote => (
      <Anecdote key={anecdote.id} anecdote={anecdote} />
    ))
  )
}

export default AnecdoteList