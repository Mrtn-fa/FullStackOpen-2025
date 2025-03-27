import { useState } from "react";

const Search = ({ onSubmit }) => {
    const [search, setSearch] = useState('');

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="input">find countries </label>
            <input name="country" value={search} onChange={event => setSearch(event.target.value)} />
        </form>
    )
}

export default Search;