import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])


  const [filter, setFilter] = useState('')

  const searchName = (arr, name) => {
    for (let obj of arr) {
      if (obj.name === name) return true
    }
    return false
  }

  const onSubmit = (newName, newNumber) => {
    if (newName === '') return
    if (searchName(persons, newName)) {
      alert(`${newName} is already added to phonebook`);
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject));
  }

  const handleOnChange = (setState) => {
    return (event) => {
      const newValue = event.target.value;
      setState(newValue);
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter name='filter' value={filter} onChange={handleOnChange(setFilter)}></Filter>

      <h3>add a new</h3>
      <PersonForm onSubmit={onSubmit} />

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App