import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/homepage';
import DealsPage from './components/deals';
import AllProductsPage from './components/allproducts';
import AboutPage from './components/about';
import CartPage from './components/cart';
import NavBar from './components/navbar';
import CheckoutPage from './components/checkout';
import SearchResults from './components/searchcontext';
import AdminPage from './components/adminscreen'; // Import the AdminPage component
import './App.css';
import './theme.css';
import { CartProvider } from './components/cartcontext';
import ProductDetail from './components/productdetail';

const App = () => {
  const [theme, setTheme] = useState('light-theme');

  const toggleTheme = () => {
    setTheme(theme === 'light-theme' ? 'dark-theme' : 'light-theme');
  };

  return (
    <CartProvider>
      <Router>
        <NavBar toggleTheme={toggleTheme} />
        <div className={theme}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/deals" element={<DealsPage />} />
            <Route path="/all-products" element={<AllProductsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/search/:searchTerm" element={<SearchResults />} />
            <Route path="/admin" element={<AdminPage />} /> // Route for AdminPage
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
