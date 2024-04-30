import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './cartcontext';

const CartPage = () => {
    const { cartItems, removeFromCart, decrementItem } = useContext(CartContext);
    const navigate = useNavigate();

    const totalCost = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div style={{ background: 'linear-gradient(to right, #e0eafc, #cfdef3)', minHeight: 'calc(100vh - 60px)', padding: '20px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '600px', width: '100%' }}>
                <h1>Your Cart</h1>
                <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px' }}>
                    {cartItems.length > 0 ? (
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {cartItems.map(item => (
                                <li key={item.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                                    <img src={item.imageUrl} alt={item.name} style={{ width: '100px', marginRight: '20px', objectFit: 'cover', borderRadius: '5px' }} />
                                    <div style={{ flex: '1' }}>
                                        <h3>{item.name}</h3>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Price: ${item.price?.toFixed(2)}</p>
                                        <p>Total: ${((item.quantity * item.price) || 0).toFixed(2)}</p>
                                        <button style={{ marginRight: '10px' }} onClick={() => decrementItem(item.id)}>Remove One</button>
                                        <button onClick={() => removeFromCart(item.id)}>Remove All</button>
                                    </div>
                                </li>
                            ))}
                            <button style={{ marginTop: '20px' }} onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
                        </ul>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                    <p><strong>Total Cost: ${totalCost.toFixed(2)}</strong></p>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
