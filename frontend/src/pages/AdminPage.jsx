import React, { useState } from 'react';

function AdminPage() {
    const [form, setForm] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        status: 'active'
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        // TODO: Add submit logic
        alert('Product submitted!');
    };

    const handleClear = () => {
        setForm({
            name: '',
            price: '',
            category: '',
            description: '',
            status: 'active'
        });
    };

  return (
    <div className="admin-page">
        <div className="admin-container">
            <section className="admin-form-section">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Product Name:</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={form.name} 
                            onChange={handleChange}
                            required 
                        />
                        <span className="error-message" id="nameError"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="Images">Image URLs (comma-separated):</label>
                        <input 
                            type="text" 
                            id="Images" 
                            name="images" 
                            placeholder="e.g., images/pic1.jpg,images/pic2.jpg" 
                            value={form.images}
                            onChange={handleChange}
                            required 
                        />
                        <span className="error-message" id="imagesError"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={10}
                        />
                        <span className="error-message" id="descriptionError"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="Price">Price (£):</label>
                        <input 
                            type="number" 
                            id="Price" 
                            name="price" 
                            step="0.01" 
                            min="0"  
                            value={form.price}
                            onChange={handleChange}
                            required
                        />
                        <span className="error-message" id="priceError"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="Category">Category:</label>
                        <select 
                            id="Category" 
                            name="category" 
                            required
                            value={form.category}
                            onChange={handleChange}
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
                        <label htmlFor="status">Status:</label>
                        <select 
                            id="status" 
                            name="status" 
                            value={form.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="In Stock">In Stock</option>
                            <option value="Low Stock">Low Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                        </select>
                    </div>

                    <div className="form-buttons">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={handleClear}>Clear</button>
                    </div>
                </form>
            </section>

            <section className="admin-product-list">
                <div className="table-container">
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Availability</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="productListBody">
                            <tr>
                                <td>P001</td>
                                <td>Example Laptop</td>
                                <td>Laptops</td>
                                <td>£1200.00</td>
                                <td>In Stock</td>
                                <td>
                                    <button className="edit-btn" data-id="P001">Edit</button>
                                    <button className="delete-btn" data-id="P001">Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <td>P002</td>
                                <td>Example Phone</td>
                                <td>Smartphones</td>
                                <td>£800.00</td>
                                <td>Low Stock</td>
                                <td>
                                    <button className="edit-btn" data-id="P002">Edit</button>
                                    <button className="delete-btn" data-id="P002">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p id="noProductsMessage" style={{display: "none"}}>No products found. Add a new product above.</p>
            </section>
        </div>
    </div>
    );
} 
       
export default AdminPage;

        