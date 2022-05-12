import React from "react";

// Henkilön lisäyskaavakkeen renderöinnistä vastaava komponentti
const PersonForm = ({addPerson, nameValue, nameHandler, numberValue, numberHandler}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                Name:
                <input
                    value={nameValue}
                    onChange={nameHandler}
                />
            </div>
            <div>
                Number:
                <input
                    value={numberValue}
                    onChange={numberHandler}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm
