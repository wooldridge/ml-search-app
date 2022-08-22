import React, { useState } from 'react';

const Search = (props) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        props.handleSearch(query);
    }

    const handleEnter = (e) => {
        if (e.keyCode === 13) {
            props.handleSearch(query);
        }
    };

    return (
        <div>
            <input 
                value={query} 
                onChange={e => setQuery(e.target.value)} 
                onKeyDown={(e) => handleEnter(e) } 
            />
            <button onClick={handleSearch}>{props.label || "Search"}</button>
        </div>
    )
}

export default Search;