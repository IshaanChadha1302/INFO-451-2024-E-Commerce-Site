import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AllProductsPage = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate(); // Initialize navigate function

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3003/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };
        fetchProducts();
    }, []);

    // Function to navigate to ProductDetail page
    const handleProductClick = (id) => {
        navigate(`/products/${id}`);
    };

    return (
        <div className="page-container">
            <h1>All Products</h1>
            <div className="product-grid">
                {products.map(product => (
                    <div key={product._id} className="product">
                        <img src={product.Images} alt={product.Name} style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                            onClick={() => handleProductClick(product._id)} // Make image clickable
                        />
                        <h3>{product.Name}</h3>
                        {product.onSale && product.salePrice ? (
                            <p>
                                <span style={{ textDecoration: 'line-through' }}>${product.Price.toFixed(2)}</span>
                                <span style={{ color: 'red', marginLeft: '10px' }}>${product.salePrice.toFixed(2)}</span>
                            </p>
                        ) : (
                            <p>${product.Price.toFixed(2)}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProductsPage;
