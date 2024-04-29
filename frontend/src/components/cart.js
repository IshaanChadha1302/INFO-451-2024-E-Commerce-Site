// CartPage.js

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './cartcontext';

const CartPage = () => {
    const { cartItems, removeFromCart, decrementItem } = useContext(CartContext);
    const navigate = useNavigate();

    const totalCost = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="page-container">
            <h1>Your Cart</h1>
            {cartItems.length > 0 ? (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            <img src={item.imageUrl} alt={item.name} style={{ width: '100px' }} />
                            <h3>{item.name}</h3>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ${item.price?.toFixed(2)}</p>
                            <p>Total: ${((item.quantity * item.price) || 0).toFixed(2)}</p>
                            <button onClick={() => decrementItem(item.id)}>Remove One</button>
                            <button onClick={() => removeFromCart(item.id)}>Remove All</button>
                        </li>
                    ))}
                    <button onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
                </ul>
            ) : (
                <p>Your cart is empty.</p>
            )}
            <p><strong>Total Cost: ${totalCost.toFixed(2)}</strong></p>
        </div>
    );
};

export default CartPage;