import React, { useState } from 'react';

function ProductForm() {
    // State to hold the form data
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

    // A single function to handle changes for all form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        // Prevent the default browser form submission behavior (page reload)
        e.preventDefault();
        
        // For now, let's just log the product data to the console
        // In a later step, we will use this function to make an API call
        console.log('Form Submitted:', product);
        
        // Here you would typically perform validation and then make an API call
        // (e.g., to create a new product or update an existing one).
    };

    // Function to clear all form inputs
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
                <span className="error-message" id="nameError"></span>
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
                <span className="error-message" id="imagesError"></span>
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
                <span className="error-message" id="descriptionError"></span>
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
                <span className="error-message" id="priceError"></span>
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
                <span className="error-message" id="categoryError"></span>
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
                <span className="error-message" id="ratingsError"></span>
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
                <span className="error-message" id="reviewsError"></span>
            </div>

            <div className="form-actions">
                <button type="submit" id="submitBtn">Add Product</button>
                <button type="button" id="clearFormBtn" className="secondary-btn" onClick={handleClear}>Clear Form</button>
            </div>
        </form>
    );
}

export default ProductForm;
            