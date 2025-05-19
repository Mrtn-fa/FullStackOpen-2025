import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './components/NotificationContext'

const App = () => {
  const showNotification = useNotificationDispatch()

  const queryClient = useQueryClient()
  const voteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (votedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueriesData(['anecdotes'], anecdotes.map(anecdote => anecdote.id === votedAnecdote.id ? votedAnecdote : anecdote))
    }
  })

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  })

  if (isPending) {
    return <div>Loading anecdotes...</div>
  }
  if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const handleVote = (anecdote) => {
    const anecdoteObject = { ...anecdote, votes: anecdote.votes + 1 }
    voteAnecdoteMutation.mutate(anecdoteObject)
    showNotification(`anecdote '${anecdote.content}' voted`)
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
