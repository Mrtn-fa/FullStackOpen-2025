const nameFilter = (substring) => {
    return (person) => {
        const name = person.name;
        const lowerString = name.toLowerCase();
        const lowerSubstring = substring.toLowerCase();

        return lowerString.includes(lowerSubstring);
    }
}

const filterByName = (arr, name) => {
    const filteredArr = arr.filter(nameFilter(name));
    return filteredArr.map((person) => <div key={person.name}>{person.name} {person.number}</div>);
}

const Persons = ({ persons, filter }) => {
    return filterByName(persons, filter)
}

export default Persons