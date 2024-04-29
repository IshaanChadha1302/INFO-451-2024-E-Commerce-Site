// CartContext.js

import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

     // Reset the cart on page reload
     useEffect(() => {
        setCartItems([]);  // This will clear the cart whenever the component mounts
    }, []);

    const addToCart = (item) => {
        setCartItems(currentItems => {
            const itemExists = currentItems.find(i => i.id === item.id);
            if (itemExists) {
                return currentItems.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...currentItems, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems(currentItems =>
            currentItems.filter(item => item.id !== itemId)
        );
    };

    const decrementItem = (itemId) => {
        setCartItems(currentItems =>
            currentItems.map(item =>
                item.id === itemId ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);  // Clear the cart items
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, decrementItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};