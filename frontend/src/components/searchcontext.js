// SearchResults.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SearchResults = () => {
    const { searchTerm } = useParams(); // Get the search term from URL
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch(`http://localhost:3003/search/${searchTerm}`);
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchResults();
    }, [searchTerm]);

    return (
        <div className="page-container">
            <h1>Search Results for: {searchTerm}</h1>
            {results.length > 0 ? (
                results.map(product => (
                    <div key={product._id}>
                        <h3>{product.name}</h3>
                        <p>${product.price.toFixed(2)}</p>
                    </div>
                ))
            ) : <p>No results found.</p>}
        </div>
    );
};

export default SearchResults;