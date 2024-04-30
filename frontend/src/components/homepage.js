import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { CartContext } from './cartcontext';  // Ensure the path is correct
import Carousel from 'react-multi-carousel'; // You might need to install this package
import 'react-multi-carousel/lib/styles.css'; // Default styles

const HomePage = () => {
    const { addToCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const [onSaleProducts, setOnSaleProducts] = useState([]);
    const navigate = useNavigate(); // Use navigate for routing

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
        width: '100%', 
        height: '200px', 
        objectFit: 'cover', 
        borderRadius: '10px'
    };

    const handleProductClick = (id) => {
        navigate(`/products/${id}`); // Navigate to product detail page
    };

    return (
        <div>
            <div className="banner">Welcome to SpongeBob Plushie World!</div>
            <h2>Most Popular Products</h2>
            <Carousel responsive={responsive}>
                {popularProducts.map(product => (
                    <div key={product._id} className="product" style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
                        <img src={product.Images} alt={product.Name} style={imageStyle} onClick={() => handleProductClick(product._id)} />
                        <h3>{product.Name}</h3>
                        <p>${product.Price.toFixed(2)}</p>
                        <button onClick={() => addToCart({...product, id: product._id, price: product.Price, imageUrl: product.Images})}>Add to Cart</button>
                    </div>
                ))}
            </Carousel>
            <h2>On Sale Products</h2>
            <Carousel responsive={responsive}>
                {onSaleProducts.map(product => (
                    <div key={product._id} className="product" style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
                        <img src={product.Images} alt={product.Name} style={imageStyle} onClick={() => handleProductClick(product._id)} />
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
    );
};

export default HomePage;
