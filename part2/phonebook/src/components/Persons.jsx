const nameFilter = (substring) => {
    return (person) => {
        const name = person.name;
        const lowerString = name.toLowerCase();
        const lowerSubstring = substring.toLowerCase();

        return lowerString.includes(lowerSubstring);
    }
}

const Person = ({ data, handleDelete }) => {
    const { id, name, number } = data;
    return (
        <div>
            {name} {number} <button onClick={handleDelete(id, name)}>delete</button>
        </div>
    )
}

const Persons = ({ persons, searchName, handleDelete }) => {
    const filteredPersons = persons.filter(nameFilter(searchName));
    return filteredPersons.map((person) => (
        <Person key={person.id} data={person} handleDelete={handleDelete} />
    ))
}

export default Persons