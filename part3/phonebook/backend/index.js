const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.static('dist'));

morgan.token('body', (req, res) => {
    if (req.method === "POST") {
        return JSON.stringify(req.body)
    }
});

const logger = morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens['body'](req, res)
    ].join(' ')
})

app.use(logger);

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

const generateId = () => {
    return Math.floor(Math.random() * 100000);
}

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.post('/api/persons', (request, response) => {
    const person = request.body;
    const { name, number } = person;

    if (!name || !number) {
        return response.status(400).json({
            error: "name or number missing"
        })
    } else if (!person) {
        return response.status(400).json({
            error: "Content missing"
        })
    }
    const exists = persons.find(person => person.name === name);
    if (exists) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const newPerson = {
        id: generateId(),
        name: name,
        number: number,
    }
    persons = persons.concat(newPerson);
    return response.json(newPerson);
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find(person => person.id === id);
    if (person) {
        return response.json(person);
    }
    return response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    persons = persons.filter(person => person.id.toString() !== id.toString());

    return response.status(204).end();
})

app.get('/api/info', (request, response) => {
    response.send(
        `<div>
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date()}</p>
        </div>`
    );
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})