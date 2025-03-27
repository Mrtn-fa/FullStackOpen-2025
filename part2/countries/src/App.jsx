import { useState, useEffect } from 'react'
import Search from './components/Search';
import Countries from './components/Country';
import countryService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [showCountries, setShowCountries] = useState([]);

  const searchByName = (name) => {
    return () => {
      const selectedCountry = countries.filter(country => country.name.common === name);
      if (selectedCountry) {
        setShowCountries(selectedCountry);
      }
    }
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const searchValue = event.target.country.value;
    const filteredCountries = countries.filter(country => {
      return country.name.common.toLowerCase().includes(searchValue.toLowerCase())
    });
    setShowCountries(filteredCountries);
    return
  }

  useEffect(() => {
    countryService
      .getAll()
      .then(newCountries => setCountries(newCountries))
  }, [])

  return (
    <>
      <Search onSubmit={onSubmit} />
      <Countries data={showCountries} onSelect={searchByName} />
    </>
  )
}

export default App
