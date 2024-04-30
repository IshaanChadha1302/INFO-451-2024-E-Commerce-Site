import React, { useState } from 'react';

const AdminIntakeScreen = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        imageUrl: '',
        stocked: false,
        popularity: 0,
        onSale: false,
        salePrice: 0,
        __v: 0 // Leave the typo as it is
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send the product data to the backend for processing
        console.log(product);
        // Clear the form after submission
        setProduct({
            name: '',
            description: '',
            price: 0,
            imageUrl: '',
            stocked: false,
            popularity: 0,
            onSale: false,
            salePrice: 0,
            __v: 0
        });
    };

    return (
        <div>
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={product.name} onChange={handleChange} />
                </label>
                <label>
                    Description:
                    <input type="text" name="description" value={product.description} onChange={handleChange} />
                </label>
                <label>
                    Price:
                    <input type="number" name="price" value={product.price} onChange={handleChange} />
                </label>
                <label>
                    Image URL:
                    <input type="text" name="imageUrl" value={product.imageUrl} onChange={handleChange} />
                </label>
                <label>
                    Stocked:
                    <input type="checkbox" name="stocked" checked={product.stocked} onChange={() => setProduct(prevProduct => ({ ...prevProduct, stocked: !prevProduct.stocked }))} />
                </label>
                <label>
                    Popularity:
                    <input type="number" name="popularity" value={product.popularity} onChange={handleChange} />
                </label>
                <label>
                    On Sale:
                    <input type="checkbox" name="onSale" checked={product.onSale} onChange={() => setProduct(prevProduct => ({ ...prevProduct, onSale: !prevProduct.onSale }))} />
                </label>
                <label>
                    Sale Price:
                    <input type="number" name="salePrice" value={product.salePrice} onChange={handleChange} />
                </label>
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AdminIntakeScreen;
