import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './cartcontext';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const HomePage = () => {
    const { addToCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const [onSaleProducts, setOnSaleProducts] = useState([]);
    const [hoveredProductId, setHoveredProductId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3003/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const data = await response.json();
                setProducts(data);
                setPopularProducts(data.filter(p => p.popularity).sort((a, b) => b.popularity - a.popularity).slice(0, 3));
                setOnSaleProducts(data.filter(p => p.onSale));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
    };

    const imageStyle = {
        width: 'auto',
        maxHeight: '200px',
        objectFit: 'contain',
        borderRadius: '10px'
    };

    const productStyle = (isHovered) => ({
        margin: '10px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'transform 0.3s ease-in-out',
        transform: isHovered ? 'translateY(-5px)' : 'none',
        overflow: 'hidden',
        backgroundColor: 'white'  // Set the background color to white for the clickable area
    });

    const handleProductClick = (id) => {
        navigate(`/products/${id}`);
    };

    const pageStyles = {
        background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
        padding: '20px',
        minHeight: 'calc(100vh - 60px)', // Adjust if your nav bar height is different
    };

    return (
        <>
            {/* Navigation Bar should go here, it's assumed to be another component */}
            <div style={pageStyles}>
                <h2>Most Popular Products</h2>
                <Carousel responsive={responsive}>
                    {popularProducts.map(product => (
                        <div key={product._id} style={productStyle(product._id === hoveredProductId)}
                             onMouseEnter={() => setHoveredProductId(product._id)}
                             onMouseLeave={() => setHoveredProductId(null)}
                             onClick={() => handleProductClick(product._id)}>
                            <img src={product.Images} alt={product.Name} style={imageStyle} />
                            <h3>{product.Name}</h3>
                            <p>${product.Price.toFixed(2)}</p>
                            <button onClick={() => addToCart({...product, id: product._id, price: product.Price, imageUrl: product.Images})}>Add to Cart</button>
                        </div>
                    ))}
                </Carousel>
                <h2>On Sale Products</h2>
                <Carousel responsive={responsive}>
                    {onSaleProducts.map(product => (
                        <div key={product._id} style={productStyle(product._id === hoveredProductId)}
                             onMouseEnter={() => setHoveredProductId(product._id)}
                             onMouseLeave={() => setHoveredProductId(null)}
                             onClick={() => handleProductClick(product._id)}>
                            <img src={product.Images} alt={product.Name} style={imageStyle} />
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
                    ))}
                </Carousel>
            </div>
        </>
    );
};

export default HomePage;
