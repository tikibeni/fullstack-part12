import React, { useState, useEffect } from 'react'

import Persons from './components/Persons'
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

import personService from './services/persons'

import './index.css'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterValue, setFilterValue] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    // Effect-hook, joka hakee sovelluksen alkutilan määritellystä osoitteesta
    useEffect(() => {
        personService
          .getAll()
          .then(initialContacts => {
            setPersons(initialContacts)
          })
    }, [])

    // Varsinainen filtteri
    const personsToShow = showAll
        ? persons
        : persons.filter(person => (person.name.toLowerCase().includes(filterValue.toLowerCase()) || person.number.toLowerCase().includes(filterValue.toLowerCase())))
    
    // Vastaa nimikentän muutoksiin reagoimisesta
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    // Vastaa numerokentän muutoksiin reagoimisesta
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    // Vastaa filter-tekstikentän muutoksiin reagoimisesta
    const handleFilterChange = (event) => {
        setFilterValue(event.target.value)
        if (event.target.value.length > 0 ) {
            if (showAll) {
                setShowAll(false)
            }
        } else {
            setShowAll(true)
        }
    }

    // Vastaa uuden henkilön lisäämisestä
    const addPerson = (event) =>{
        event.preventDefault()

        const personObject = {
            name: newName,
            number: newNumber
        }

        // TÄMÄN TOIMIVUUS PITÄÄ VARMISTAA - FIKSAA ERROR.RESPONSE.DATA NÄKYVÄKSI, JONKA JÄLKEEN BUILDAA BÄKKIIN.
        if (persons.some(person => person.name === newName)) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                updatePerson(personObject)
            }
        } else {
            personService
              .create(personObject)
              .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setSuccessMessage(`Added '${personObject.name}'`)
                    setTimeout(() => {
                        setSuccessMessage(null)
                    },5000)
               })
               .catch(error => {
                   setErrorMessage(error.response.data.message)
                   setTimeout(() => {
                       setErrorMessage(null)
                   }, 10000)
               })
        }

        setNewName('')
        setNewNumber('')
    }

    // Yhteystiedon päivityksestä vastaava
    const updatePerson = (person) => {
        const updateId = persons.find(p => p.name === person.name).id
        personService
          .update(updateId, person)
          .then(returnedPerson => {
              setPersons(persons.map(p => p.name !== person.name ? p : returnedPerson))
              setSuccessMessage(
                  `Updated ${person.name}'s number to ${person.number}`
              )
              setTimeout(() => {
                  setSuccessMessage(null)
              }, 5000)

          })
          .catch(_ => {
              setErrorMessage(
                `Person '${person.name}' was already deleted from server`
              )
              setTimeout(() => {
                  setErrorMessage(null)
              }, 5000)

              setPersons(persons.filter(p => p.name !== person.name))
          })
    }

    // Poistosta vastaava
    const deletePerson = (event) => {
        const personToBeDeleted = persons.find(person => person.name === event.target.value)

        if (window.confirm(`Delete ${personToBeDeleted.name}?`)) {
            personService
              .remove(personToBeDeleted.id)
              .then(_ => {
                  setPersons(persons.filter(person => person.name !== personToBeDeleted.name))
                  setSuccessMessage(`Deleted '${personToBeDeleted.name}'`)
                  setTimeout(() => {
                      setSuccessMessage(null)
                  }, 5000)
              })
              .catch(_ => {
                  setErrorMessage(
                    `Person '${personToBeDeleted.name}' is already deleted from the server`
                  )
                  setTimeout(() => {
                      setErrorMessage(null)
                  }, 5000)

                  setPersons(persons.filter(person => person.name !== personToBeDeleted.name))
              })   
        }
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={errorMessage} notificationType='error' />
            <Notification message={successMessage} notificationType='success' />
            <Filter value={filterValue} filterHandler={handleFilterChange} />

            <h2>Add a new</h2>
            <PersonForm addPerson={addPerson} nameValue={newName} nameHandler={handleNameChange} numberValue={newNumber} numberHandler={handleNumberChange} />    

            <h2>Numbers</h2>
            <Persons persons={personsToShow} deleteFunction={deletePerson} />
        </div>
    )
}

export default App
