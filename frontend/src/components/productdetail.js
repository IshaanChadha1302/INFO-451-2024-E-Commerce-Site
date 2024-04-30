import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from './cartcontext';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);

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

    return (
        <div style={{ padding: '20px' }}>
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
    );
};

export default ProductDetail;
