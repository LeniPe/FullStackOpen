import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'
import weather from './services/weather'

const CountrySearch = ({ searchTerm, onChange }) => {

  return (
    <p>Find countries: <input value={searchTerm} onChange={onChange} /></p>
  )

}

const CountryMatches = ({ matchedCountries, onSelect }) => {
  if (matchedCountries.length > 10) {
    return <p>Too many matches, continue typing</p>
  }
  if (matchedCountries.length == 0) {
    return <p>Start typing to find countries</p>
  }

  return (
    <ul>
      {matchedCountries.map(c => <li key={c}>{c} <button onClick={() => onSelect(c)}>select</button></li>)}
    </ul>
  )

}

const CountryDetails = ({ countryDetails }) => {
  if (countryDetails === null) {
    return (null)
  }

  return (
    <div>
      <h2>{countryDetails.flag} {countryDetails.name.common}</h2>
      <p>Capital: {countryDetails.capital[0]}</p>
      <p>Languages</p>
      <ul>
        {Object.values(countryDetails.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <p>Population: {countryDetails.population}</p>
    </div>
  )

}

const WeatherInfo = ({ weather, countryDetails }) => {
  if (countryDetails === null | weather === null) return <></>
  return (
    <div>
      <h2>
        <img
          src={`https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`}
          alt="Weather icon"
          style={{
            width: "80px",
            height: "80px",
            verticalAlign: "middle"
          }}
        />
        Current weather at {countryDetails.capital}
      </h2>
      <p>Description: {weather.weather[0].description} </p>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed}m/s</p>
    </div>
  )
}

const App = () => {

  const [countries, setCountries] = useState([''])
  const [searchTerm, setSearchTerm] = useState('')
  const [matchedCountries, setMatchedCountries] = useState([])
  const [countryDetails, setCountryDetails] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then(countries => setCountries(countries))
  }
    , [])

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSelectCountry = (country) => {
    setSearchTerm(country)
  }

  useEffect(() => {
    if (searchTerm === '') {
      setMatchedCountries([])
    } else {
      const newMatches = countries.filter(country => country.toLowerCase().startsWith(searchTerm.toLowerCase()))
      setMatchedCountries(newMatches)
    }
  }, [searchTerm])

  useEffect(() => {
    if (countryDetails === null) {
      setWeather(null)
    } else {
      const coords = countryDetails.capitalInfo.latlng
      weatherService
        .getCurrentWeather(coords[0], coords[1])
        .then(response => setWeather(response))
    }
  }, [countryDetails])

  useEffect(() => {
    if (matchedCountries.length === 1) {
      countryService
        .getDetails(matchedCountries[0])
        .then(details => setCountryDetails(details))
    } else {
      setCountryDetails(null)
    }
  }, [matchedCountries])


  return (
    <div>
      <h1>Countries</h1>
      <CountrySearch searchTerm={searchTerm} onChange={handleSearchTerm} />
      <CountryMatches matchedCountries={matchedCountries} onSelect={handleSelectCountry} />
      <CountryDetails countryDetails={countryDetails} />
      <WeatherInfo weather={weather} countryDetails={countryDetails} />
    </div>
  )

}

export default App