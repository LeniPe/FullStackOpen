import { useState, useEffect } from 'react'
import entryService from './services/entries'

const Entries = ({ entries, searchTerm, onDelete }) => {
  return (
    <div>
      {entries.map(entry =>
        <Entry key={entry.id} entry={entry} searchTerm={searchTerm} onDelete={onDelete} />
      )}
    </div>
  )
}

const Entry = ({ entry, searchTerm, onDelete }) => {
  if (entry.name.toLowerCase().includes(searchTerm.toLowerCase())) {
    return (
      <p>
        {entry.name} {entry.number} <button onClick={() => onDelete(entry.id)}>delete</button>
      </p>)
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

const Notification = ({message, color}) => {
  const notificationStyle = {
    color: color,
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (message === null) {
    return null
  }

  console.log(message)
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {

  const [entries, setEntries] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState({ 'message': null, 'color': 'green' })

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
    const newEntry = { name: newName, number: newNumber }
    const matchingEntries = entries.filter(entry => entry.name.toLowerCase() === newName.toLowerCase())

    if (newName === "") {
      alert("Name cannot be empty")
    }
    else if (matchingEntries.length > 0) {
      const existing_id = matchingEntries[0].id
      if (window.confirm(`${newName} is already in phonebook, do you want to update the number?`)) {
        entryService
          .update(existing_id, newEntry)
          .then(updatedEntry => {
            setEntries(entries.map(entry => (entry.id !== updatedEntry.id ? entry : updatedEntry)))
            showNotification(`Updated ${newName}`)
          })
          .catch(error => {
            showNotification(`Update failed with error: ${error}`, 'red')
            setEntries(entries.filter(entry => entry.id !== existing_id))
          })

      }
    }
    else {
      entryService
        .create(newEntry)
        .then(createdEntry => {
          setEntries(entries.concat(createdEntry))
          showNotification(`Added ${newName}`)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deleteEntry = (id) => {
    entryService
      .remove(id)
      .then(deletedEntry => {
        setEntries(entries.filter(entry => entry.id !== deletedEntry.id))
        showNotification(`Deleted entry with id ${id}`, 'orange')
      })
      .catch(error => {
        console.log(`Deletion failed with error ${error}`)
      })
  }

  useEffect(() => {
    entryService
      .getAll()
      .then(initialEntries => {
        setEntries(initialEntries)
      })
  }
    , [])

  const showNotification = (message, color='green', timeout=3000) => {
        setNotification({ 'message': message, 'color': color })
        setTimeout(() => setNotification({ 'message': null, 'color': 'green' }), timeout)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification.message} color={notification.color} />
      <AddEntryForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} onSubmit={addEntry} />
      <h2>Numbers</h2>
      <SearchForm searchTerm={searchTerm} onChange={handleSearchTerm} />
      <Entries entries={entries} searchTerm={searchTerm} onDelete={deleteEntry} />
    </div>
  )
}

export default App