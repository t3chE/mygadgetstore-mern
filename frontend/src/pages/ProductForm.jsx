import React, { useState } from 'react';
import { addProduct } from '../utils/api';

function ProductForm() {
    const [product, setProduct] = useState({
        name: '',
        images: '',
        description: '',
        price: '',
        category: '',
        availability: 'In Stock',
        ratings: '',
        reviews: ''
    });
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!product.name.trim()) newErrors.name = 'Product Name is required.';
        if (!product.images.trim()) newErrors.images = 'At least one image URL is required.';
        if (!product.description.trim()) newErrors.description = 'Description is required.';
        if (!product.price || isNaN(product.price) || parseFloat(product.price) <= 0) newErrors.price = 'Price must be a positive number.';
        if (!product.category) newErrors.category = 'Category is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');
        setSubmitSuccess('');
        if (validateForm()) {
            try {
                // Prepare product data for backend
                const productData = {
                    name: product.name,
                    imageUrl: product.images.split(',')[0].trim(), // Use first image for now
                    description: product.description,
                    price: parseFloat(product.price),
                    category: product.category,
                    status: product.availability,
                    rating: product.ratings ? parseFloat(product.ratings) : undefined,
                    reviews: product.reviews ? parseInt(product.reviews) : undefined,
                    stock: 1 // You may want to add a stock field to your form
                };
                await addProduct(productData);
                setSubmitSuccess('Product added successfully!');
                handleClear();
            } catch (err) {
                setSubmitError(err.message || 'Failed to add product.');
            }
        }
    };

    const handleClear = () => {
        setProduct({
            name: '',
            images: '',
            description: '',
            price: '',
            category: '',
            availability: 'In Stock',
            ratings: '',
            reviews: ''
        });
        setErrors({});
    };

    return (
        <form id="productForm" className="product-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="productName">Product Name:</label>
                <input
                    type="text"
                    id="productName"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                />
                <span className="error-message" id="nameError">{errors.name}</span>
            </div>

            <div className="form-group">
                <label htmlFor="productImages">Image URLs (comma-separated):</label>
                <input
                    type="text"
                    id="productImages"
                    name="images"
                    placeholder="e.g., images/pic1.jpg,images/pic2.jpg"
                    value={product.images}
                    onChange={handleChange}
                    required
                />
                <span className="error-message" id="imagesError">{errors.images}</span>
            </div>

            <div className="form-group">
                <label htmlFor="productDescription">Description:</label>
                <textarea
                    id="productDescription"
                    name="description"
                    rows="5"
                    value={product.description}
                    onChange={handleChange}
                    required
                ></textarea>
                <span className="error-message" id="descriptionError">{errors.description}</span>
            </div>

            <div className="form-group">
                <label htmlFor="productPrice">Price (£):</label>
                <input
                    type="number"
                    id="productPrice"
                    name="price"
                    step="0.01"
                    min="0"
                    value={product.price}
                    onChange={handleChange}
                    required
                />
                <span className="error-message" id="priceError">{errors.price}</span>
            </div>

            <div className="form-group">
                <label htmlFor="productCategory">Category:</label>
                <select
                    id="productCategory"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a Category</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Smartphones">Smartphones</option>
                    <option value="Headphones">Headphones</option>
                    <option value="Cameras">Cameras</option>
                </select>
                <span className="error-message" id="categoryError">{errors.category}</span>
            </div>

            <div className="form-group">
                <label htmlFor="productAvailability">Availability Status:</label>
                <select
                    id="productAvailability"
                    name="availability"
                    value={product.availability}
                    onChange={handleChange}
                    required
                >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="productRatings">Rating (0-5, optional):</label>
                <input
                    type="number"
                    id="productRatings"
                    name="ratings"
                    step="0.1"
                    min="0"
                    max="5"
                    value={product.ratings}
                    onChange={handleChange}
                />
                <span className="error-message" id="ratingsError">{errors.ratings}</span>
            </div>

            <div className="form-group">
                <label htmlFor="productReviews">Number of Reviews (optional):</label>
                <input
                    type="number"
                    id="productReviews"
                    name="reviews"
                    min="0"
                    value={product.reviews}
                    onChange={handleChange}
                />
                <span className="error-message" id="reviewsError">{errors.reviews}</span>
            </div>

            {submitError && <div className="error-message">{submitError}</div>}
            {submitSuccess && <div className="success-message">{submitSuccess}</div>}

            <div className="form-actions">
                <button
                    type="submit"
                    id="submitBtn"
                    style={{ backgroundColor: '#2e7d32', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}
                >
                    Add Product
                </button>
                <button
                    type="button"
                    id="clearFormBtn"
                    className="secondary-btn"
                    onClick={handleClear}
                    style={{ backgroundColor: '#bdbdbd', color: 'black', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    Clear Form
                </button>
            </div>
        </form>
    );
}

export default ProductForm;