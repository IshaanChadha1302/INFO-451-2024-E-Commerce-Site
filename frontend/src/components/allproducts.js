import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AllProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [hoveredProductId, setHoveredProductId] = useState(null);
    const navigate = useNavigate();

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

    // Styles
    const styles = {
        pageContainer: {
            background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
            padding: '20px',
            minHeight: '100vh'
        },
        productGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            padding: '20px'
        },
        product: {
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '15px',
            cursor: 'pointer',
            transition: 'transform 0.3s ease-in-out'
        },
        productImage: {
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '8px'
        },
        productName: {
            marginTop: '10px',
            color: '#333'
        },
        productPrice: {
            color: '#555'
        },
        productSalePrice: {
            textDecoration: 'line-through'
        },
        salePrice: {
            color: 'red',
            marginLeft: '10px'
        }
    };

    return (
        <div style={styles.pageContainer}>
            <h1>All Products</h1>
            <div style={styles.productGrid}>
                {products.map(product => (
                    <div 
                        key={product._id} 
                        style={styles.product}
                        onClick={() => navigate(`/products/${product._id}`)}
                    >
                        <img
                            src={product.Images}
                            alt={product.Name}
                            style={styles.productImage}
                        />
                        <h3 style={styles.productName}>{product.Name}</h3>
                        {product.onSale && product.salePrice ? (
                            <p>
                                <span style={styles.productSalePrice}>${product.Price ? product.Price.toFixed(2) : 'N/A'}</span>
                                <span style={styles.salePrice}>${product.salePrice.toFixed(2)}</span>
                            </p>
                        ) : (
                            <p style={styles.productPrice}>${product.Price ? product.Price.toFixed(2) : 'N/A'}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProductsPage;
