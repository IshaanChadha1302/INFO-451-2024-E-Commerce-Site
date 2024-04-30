import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from './cartcontext';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3003/products/${id}`);
                if (!response.ok) {
                    throw new Error('Product not found');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
                navigate('/'); // Redirect to home if the product is not found
            }
        };
        fetchProduct();
    }, [id, navigate]);

    if (!product) return <div>Loading...</div>;

    const handleAddToCart = () => {
        addToCart({
            ...product,
            id: product._id,
            price: product.onSale ? product.salePrice : product.Price, // Use sale price if on sale
            imageUrl: product.Images
        });
    };

    const handleAddToCartAndCheckout = () => {
        handleAddToCart();
        navigate('/checkout'); // Navigate to checkout page
    };

    const productStyle = {
        width: 'fit-content',
        margin: 'auto',
        padding: '20px',
        cursor: 'pointer',
        backgroundColor: 'white', // Set the background color of the product card to white
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        transform: isHovered ? 'translateY(-5px)' : 'none',
        transition: 'transform 0.3s ease-in-out',
        boxShadow: isHovered ? '0 8px 16px rgba(0,0,0,0.2)' : 'none'
    };

    return (
        <div style={{ background: 'linear-gradient(to right, #e0eafc, #cfdef3)', minHeight: 'calc(100vh - 60px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={productStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <img src={product.Images} alt={product.Name} style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
                <h2>{product.Name}</h2>
                <p>{product.Description}</p>
                <p>Price: {product.onSale && product.salePrice ? (
                    <>
                        <span style={{ textDecoration: 'line-through' }}>${product.Price.toFixed(2)}</span>
                        <span style={{ color: 'red', marginLeft: '10px' }}>${product.salePrice.toFixed(2)}</span>
                    </>
                ) : `$${product.Price.toFixed(2)}`}</p>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductDetail;
