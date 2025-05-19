import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'
const getAnecdoteUrl = id => `${baseUrl}/${id}`

export const getAnecdotes = () => axios.get(baseUrl).then(res => res.data)

export const createAnecdote = (newAnecdote) => axios.post(baseUrl, newAnecdote).then(res => res.data)

export const updateAnecdote = (updatedAnecdote) => axios.put(getAnecdoteUrl(updatedAnecdote.id), updatedAnecdote).then(res => res.data)