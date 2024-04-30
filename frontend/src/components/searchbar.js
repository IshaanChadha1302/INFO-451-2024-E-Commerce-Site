// SearchBar.js

import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Implement your search functionality here
    };

    return (
        <form onSubmit={handleSearchSubmit}>
            <input
                type="text"
                placeholder="Search..."
                className="search-bar"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
