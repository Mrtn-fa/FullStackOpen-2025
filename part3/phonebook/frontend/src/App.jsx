import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import numberService from './services/numbers'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [messageType, setMessageType] = useState('success');

  useEffect(() => {
    numberService
      .getAll()
      .then(initialData => setPersons(initialData));
  }, [])

  const searchName = (arr, name) => {
    for (let obj of arr) {
      if (obj.name === name) return true
    }
    return false
  }

  const showNotification = (message, type = 'success') => {
    setNotificationMessage(message);
    setMessageType(type);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 3000)
  }

  const removePerson = (id) => {
    const newPersons = persons.filter(person => person.id !== id);
    setPersons(newPersons);
  }

  const onSubmit = (newName, newNumber) => {
    if (newName === '') return
    if (searchName(persons, newName)) {
      const personObject = persons.find(person => person.name === newName);
      const id = personObject.id;
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...personObject, number: newNumber }
        numberService.update(id, updatedPerson).then(returnedPerson => {
          const newPersons = persons.map(person => person.id === id ? returnedPerson : person)
          setPersons(newPersons);
          showNotification(`Modified ${returnedPerson.name}`);
        }).catch(error => {
          showNotification(`Information of ${personObject.name} has already been removed from server`, 'error');
          removePerson(id);
        })
      }
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    numberService
      .create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson));
        showNotification(`Added ${newPerson.name}`);
      })
  }

  const handleOnChange = (setState) => {
    return (event) => {
      const newValue = event.target.value;
      setState(newValue);
    }
  }

  const handleDelete = (id, name) => {
    return () => {
      if (window.confirm(`Delete ${name}?`)) {
        numberService.remove(id).then(() => {
          removePerson(id);
        }).catch(error => {
          showNotification(`Information of ${name} has already been removed from server`, 'error');
          removePerson(id);
        })
      }

    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={messageType} />

      <Filter name='filter' value={filter} onChange={handleOnChange(setFilter)}></Filter>

      <h3>add a new</h3>
      <PersonForm onSubmit={onSubmit} />

      <h3>Numbers</h3>
      <Persons persons={persons} searchName={filter} handleDelete={handleDelete} />
    </div>
  )
}

export default App