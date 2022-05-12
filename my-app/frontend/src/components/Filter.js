import React from "react";

// Filtterin renderöinnistä vastaava komponentti
const Filter = ({value, filterHandler}) => {
    return (
        <div>
            Filter:
            <input
                value={value}
                onChange={filterHandler}
            />
        </div>
    )
}

export default Filter
