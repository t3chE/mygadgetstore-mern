import React, { useState, useEffect } from 'react';
import { addProduct, getProducts } from '../utils/api';

function AdminPage() {
    const [form, setForm] = useState({
        name: '',
        images: '',
        description: '',
        price: '',
        category: '',
        status: 'In Stock'
    });
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch products on mount
    useEffect(() => {
        refreshProducts();
    }, []);

    const refreshProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (err) {
            setError('Failed to load products.');
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const productData = {
                name: form.name,
                imageUrl: form.images.split(',')[0].trim(),
                description: form.description,
                price: parseFloat(form.price),
                category: form.category,
                status: form.status,
                stock: 1
            };
            await addProduct(productData);
            setSuccess('Product added successfully!');
            setForm({
                name: '',
                images: '',
                description: '',
                price: '',
                category: '',
                status: 'In Stock'
            });
            refreshProducts();
        } catch (err) {
            setError('Failed to add product.');
        }
    };

    const handleClear = () => {
        setForm({
            name: '',
            images: '',
            description: '',
            price: '',
            category: '',
            status: 'In Stock'
        });
        setError('');
        setSuccess('');
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
                        </div>
                        <div className="form-group">
                            <label htmlFor="images">Image URLs (comma-separated):</label>
                            <input
                                type="text"
                                id="images"
                                name="images"
                                placeholder="e.g., images/pic1.jpg,images/pic2.jpg"
                                value={form.images}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows={5}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price (£):</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                step="0.01"
                                min="0"
                                value={form.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category:</label>
                            <select
                                id="category"
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
                        {error && <div className="error-message">{error}</div>}
                        {success && <div className="success-message">{success}</div>}
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
                            <tbody>
                                {products.length === 0 ? (
                                    <tr>
                                        <td colSpan="6">No products found. Add a new product above.</td>
                                    </tr>
                                ) : (
                                    products.map(product => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.category}</td>
                                            <td>£{product.price.toFixed(2)}</td>
                                            <td>{product.status}</td>
                                            <td>
                                                <button className="edit-btn" data-id={product._id}>Edit</button>
                                                <button className="delete-btn" data-id={product._id}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AdminPage;