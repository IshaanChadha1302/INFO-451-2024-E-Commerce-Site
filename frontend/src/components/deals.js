import React, { useState, useEffect } from 'react';

const DealsPage = () => {
    const [onSaleProducts, setOnSaleProducts] = useState([]);

    useEffect(() => {
        const fetchOnSaleProducts = async () => {
            const response = await fetch('http://localhost:3003/products');
            const data = await response.json();
            setOnSaleProducts(data.filter(product => product.onSale));
        };

        fetchOnSaleProducts();
    }, []);

    return (
        <div className="page-container">
            <h1>Deals</h1>
            {onSaleProducts.length > 0 ? (
                onSaleProducts.map(product => (
                    <div key={product._id}>
                        <img src={product.Images} alt={product.Name} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                        <h2>{product.Name}</h2>
                        <p>${product.Price.toFixed(2)}</p>
                    </div>
                ))
            ) : (
                <p>No products on sale right now.</p>
            )}
        </div>
    );
};

export default DealsPage;