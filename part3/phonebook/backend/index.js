const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
})

const requestLogger = morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['body'](req, res)
  ].join(' ')
})

app.use(requestLogger)

const errorHandler = (error, request, response, next) => {
  console.log(error.name)
  console.log(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ 'error': 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}


app.get('/api/persons', (request, response) => {
  Person
    .find({})
    .then(persons => {
      response.json(persons)
    })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const { name, number } = body

  if (!name || !number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  const person = new Person({
    name: name,
    number: number
  })

  person
    .save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then(result => {
      if (result) {
        response.status(204).end()
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/api/info', (request, response) => {
  Person
    .find({})
    .then(persons => {
      response.send(
        `<div>
              <p>Phonebook has info for ${persons.length} people</p>
              <p>${new Date()}</p>
          </div>`
      )
    })
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const { name, number } = request.body
  Person
    .findById(id)
    .then(person => {
      if (person) {
        person.name = name
        person.number = number
        return person
          .save()
          .then(updatedPerson => {
            response.json(updatedPerson)
          })
          .catch(error => {
            console.log('ERROR!')
            return next(error)
          })
      } else response.status(204).end()
    })
    .catch(error => {
      console.log('error!')
      next(error)
    })
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})