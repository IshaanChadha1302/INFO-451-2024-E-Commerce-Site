// CheckoutPage.js

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './cartcontext';

const CheckoutPage = () => {
    const { clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        setIsSubmitted(true);
        clearCart();  // Clear the cart
        setTimeout(() => {
            navigate('/'); // Navigate back to homepage after 3 seconds
        }, 3000);
    };

    if (isSubmitted) {
        return <div>Thank you for your purchase!</div>;
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: 'auto' }}>
            <h1>Checkout</h1>
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
                Address:
                <input type="text" name="address" value={formData.address} onChange={handleChange} required />
            </label>
            <label>
                Card Number:
                <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required />
            </label>
            <label>
                Expiry Date:
                <input type="month" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required />
            </label>
            <label>
                CVV:
                <input type="number" name="cvv" min="100" max="999" value={formData.cvv} onChange={handleChange} required style={{ WebkitAppearance: 'none', margin: 0 }} />
            </label>
            <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
        </form>
    );
};

export default CheckoutPage;