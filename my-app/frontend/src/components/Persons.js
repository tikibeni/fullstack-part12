import React from 'react'

// Taulukon rakentaminen ja koko puhelinluettelon hallinta
const Persons = ({persons, deleteFunction}) => {
    return (
        <table>
            <tbody>
                {persons.map(person =>
                    <Person key={person.id} person={person} deleteFunction={deleteFunction}/>
                )}
            </tbody>
        </table>
    )
}

// Yksittäisen yhteystiedon renderöinti taulukkoon
const Person = ({person, deleteFunction}) => {
    return (
        <tr>
            <td>{person.name}</td> 
            <td>{person.number}</td>
            <td>
                <button
                  onClick={deleteFunction}
                  value={person.name}
                >Delete</button>
            </td>
        </tr>
    )
}

export default Persons