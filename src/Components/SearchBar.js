import React, { useState } from 'react';

function SearchBar({ onSearch}) {
    const [searchItem, setSearchItem] = useState('');
    const handleChange = (event) => {
        setSearchItem(event.target.value);
    };
    const handleSearch = () => {onSearch(searchItem)};

    return (
        <div>
            <input type='text' value={searchItem} onChange={handleChange} placeholder='Search task/users... etc'/>
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SearchBar;