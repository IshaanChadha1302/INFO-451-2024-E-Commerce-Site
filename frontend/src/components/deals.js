import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { CartContext } from './cartcontext'; // Ensure the path is correct

const DealsPage = () => {
    const [onSaleProducts, setOnSaleProducts] = useState([]);
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext); // Use CartContext to add items to cart

    useEffect(() => {
        const fetchOnSaleProducts = async () => {
            try {
                const response = await fetch('http://localhost:3003/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setOnSaleProducts(data.filter(product => product.onSale));
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchOnSaleProducts();
    }, []);

    const handleProductClick = (id) => {
        navigate(`/products/${id}`); // Navigate to product detail page
    };

    return (
        <div className="page-container">
            <h1>Deals</h1>
            <div className="product-grid">
                {onSaleProducts.length > 0 ? (
                    onSaleProducts.map(product => (
                        <div key={product._id} className="product">
                            <img src={product.Images} alt={product.Name} style={{ width: '200px', height: '200px', objectFit: 'cover' }} onClick={() => handleProductClick(product._id)} />
                            <h3>{product.Name}</h3>
                            <p>
                                {product.salePrice && product.salePrice < product.Price ? (
                                    <>
                                        <span style={{ textDecoration: 'line-through' }}>${product.Price.toFixed(2)}</span>
                                        <span style={{ color: 'red', marginLeft: '10px' }}>${product.salePrice.toFixed(2)}</span>
                                    </>
                                ) : `$${product.Price.toFixed(2)}`}
                            </p>
                            <button onClick={() => addToCart({...product, id: product._id, price: (product.salePrice || product.Price), imageUrl: product.Images})}>Add to Cart</button>
                        </div>
                    ))
                ) : (
                    <p>No products on sale right now.</p>
                )}
            </div>
        </div>
    );
};

export default DealsPage;