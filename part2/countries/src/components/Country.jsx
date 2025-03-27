import Flag from "./Flag";
import Weather from "./Weather";

const Country = ({ props }) => {
    const name = props.name.common;
    const area = props.area;
    const capital = props.capital[0];
    const [lat, lon] = props.capitalInfo.latlng;
    const languages = props.languages;
    const flagPng = props.flags.png;


    return (<div>
        <h1>{name}</h1>
        <div>Capital {capital}</div>
        <div>Area {area}</div>

        <h2>Languages</h2>
        <ul>
            {Object.values(languages).map(lang => <li key={lang}>{lang}</li>)}
        </ul>

        <Flag source={flagPng} />
        <Weather city={capital} lat={lat} lon={lon} />
    </div>)
}

const Countries = ({ data, onSelect }) => {
    if (data.length === 1) {
        return <Country props={data[0]} />
    } else if (data.length > 10) {
        return <div>Too many matches, speficy another filter</div>
    }
    return data.map((country) => {
        return (
            <div key={country.name.common}>
                {country.name.common} <button onClick={onSelect(country.name.common)}>show</button>
            </div>
        )
    })
}

export default Countries;