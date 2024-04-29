import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SearchResults = () => {
    const { searchTerm } = useParams();
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            const response = await fetch(`http://localhost:3003/search/${searchTerm}`);
            const data = await response.json();
            setResults(data);
        };
        fetchResults();
    }, [searchTerm]);

    return (
        <div className="page-container">
            <h1>Search Results for: {searchTerm}</h1>
            {results.map(product => (
                <div key={product._id}>
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default SearchResults;