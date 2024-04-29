import React, { useState, useEffect } from 'react';

const AllProductsPage = () => {
    const [products, setProducts] = useState([]);

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

    return (
        <div className="page-container">
            <h1>All Products</h1>
            <div className="product-grid">
                {products.map(product => (
                    <div key={product._id} className="product">
                        <img src={product.Images} alt={product.Name} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                        <h3>{product.Name}</h3>
                        <p>${product.Price ? Number(product.Price).toFixed(2) : "0.00"}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProductsPage;