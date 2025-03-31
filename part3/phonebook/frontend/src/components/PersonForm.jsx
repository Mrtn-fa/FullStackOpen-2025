import { useState } from 'react'


const PersonFormInput = ({ name, value, onChange }) => {
    return (
        <div>
            {name}: <input name={name} value={value} onChange={onChange} />
        </div>
    )
}

const PersonForm = ({ onSubmit }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleOnChange = (setState) => {
        return (event) => {
            const newValue = event.target.value;
            setState(newValue);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(newName, newNumber);
        setNewName('');
        setNewNumber('');
    }
    return (
        <form onSubmit={handleSubmit}>
            <PersonFormInput name='name' value={newName} onChange={handleOnChange(setNewName)} />
            <PersonFormInput name='number' value={newNumber} onChange={handleOnChange(setNewNumber)} />
            <div><button type="submit">add</button></div>
        </form>
    )

}

export default PersonForm;