import { useState, useEffect } from 'react'
import axios from 'axios'

const Entries = ({ entries, searchTerm }) => {
  return (
    <div>
      {entries.map(entry =>
        <Entry key={entry.name} entry={entry} searchTerm={searchTerm} />
      )}
    </div>
  )
}

const Entry = ({ entry, searchTerm }) => {
  if (entry.name.toLowerCase().includes(searchTerm.toLowerCase())) {
    return (<p> {entry.name} {entry.number}</p>)
  }
  else return null
}

const AddEntryForm = ({ newName, newNumber, handleNameChange, handleNumberChange, onSubmit }) => {
  return (
    <>
      <h2>Add Entry</h2>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const SearchForm = ({ searchTerm, onChange }) => {
  return (
    <div>
      search names: <input value={searchTerm} onChange={onChange} />
    </div>)
}

const App = () => {

  const [entries, setEntries] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value)
  }

  const addEntry = (event) => {
    event.preventDefault()
    const names = entries.map(entry => entry.name)

    if (names.includes(newName)) {
      console.log("Name is already in phonebook!")
      alert(`Name ${newName} is already in phonebook`)
    }
    else {
      const newEntry = { name: newName, number: newNumber }
      setEntries(entries.concat(newEntry))
    }
    setNewName('')
    setNewNumber('')
  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setEntries(response.data)
      })
  }
    , [])

  return (
    <div>
      <h1>Phonebook</h1>
      <AddEntryForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} onSubmit={addEntry} />
      <h2>Numbers</h2>
      <SearchForm searchTerm={searchTerm} onChange={handleSearchTerm} />
      <Entries entries={entries} searchTerm={searchTerm} />
    </div>
  )
}

export default App