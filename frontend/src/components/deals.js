import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './cartcontext'; // Ensure the path is correct

const DealsPage = () => {
    const [onSaleProducts, setOnSaleProducts] = useState([]);
    const [hoveredProductId, setHoveredProductId] = useState(null);
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);

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
        navigate(`/products/${id}`);
    };

    const productStyle = (isHovered) => ({
        cursor: 'pointer',
        backgroundColor: 'white', // Set the background color of the product card to white
        padding: '10px',
        margin: '10px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        transform: isHovered ? 'translateY(-5px)' : 'none',
        transition: 'transform 0.3s ease-in-out',
        boxShadow: isHovered ? '0 8px 16px rgba(0,0,0,0.2)' : 'none'
    });

    return (
        <div className="page-container" style={{ background: 'linear-gradient(to right, #e0eafc, #cfdef3)', minHeight: 'calc(100vh - 60px)' }}>
            <h1>Deals</h1>
            <div className="product-grid" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {onSaleProducts.length > 0 ? (
                    onSaleProducts.map(product => (
                        <div key={product._id}
                             style={productStyle(product._id === hoveredProductId)}
                             onMouseEnter={() => setHoveredProductId(product._id)}
                             onMouseLeave={() => setHoveredProductId(null)}
                             onClick={() => handleProductClick(product._id)}>
                            <img src={product.Images} alt={product.Name} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
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
