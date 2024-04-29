import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from './cartcontext';

const NavBar = ({ toggleTheme }) => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/search/${searchTerm}`);
    };

    return (
        <nav className="nav-bar">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search..."
                    className="search-bar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/deals">Deals</Link>
                <Link to="/all-products">All Products</Link>
                <Link to="/about">About</Link>
                <Link to="/cart">Cart ({totalItems})</Link>
            </div>
            <button onClick={toggleTheme} className="toggle-theme-button">Toggle Theme</button>
        </nav>
    );
};

export default NavBar;