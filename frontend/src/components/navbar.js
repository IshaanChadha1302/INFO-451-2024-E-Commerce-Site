import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from './cartcontext'; // Ensure path is correct
import SearchBar from './searchbar'; // Corrected import path

const NavBar = ({ toggleTheme }) => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    // Calculate total number of items in the cart
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className="nav-bar">
            {/* Replace the search form with the SearchBar component */}
            <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/deals">Deals</Link>
                <Link to="/all-products">All Products</Link>
                <Link to="/about">About</Link>
                <Link to="/cart">Cart ({totalItems})</Link>
                {/* Add a link to the admin screen */}
                <Link to="/admin">Admin</Link>
            </div>
            <button onClick={toggleTheme} className="toggle-theme-button">Toggle Theme</button>
        </nav>
    );
};

export default NavBar;
