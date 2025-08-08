import React, { useState, useEffect } from 'react';
import { addProduct, getProducts, deleteProduct, updateProduct } from '../utils/api';
import { useNavigate } from 'react-router-dom';

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
    const [editingId, setEditingId] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

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

    const validateForm = () => {
        const newErrors = {};

        if (!form.name || form.name.trim().length < 3) {
            newErrors.name = "Product name must be at least 3 characters.";
        }

        if (!form.images || form.images.trim().length === 0) {
            newErrors.images = "Image field is required.";
        } else if (!/^([\w\-\/\.]+|https?:\/\/[\w\-\.\/]+)(,([\w\-\/\.]+|https?:\/\/[\w\-\.\/]+))*$/.test(form.images)) {
            newErrors.images = "Image format is invalid.";
        }

        if (!form.description || form.description.trim().length < 10) {
            newErrors.description = "Description must be at least 10 characters.";
        }

        if (!form.price || isNaN(form.price) || Number(form.price) <= 0) {
            newErrors.price = "Price must be a number greater than 0.";
        }

        if (!form.category) {
            newErrors.category = "Category is required.";
        }

        if (!form.status) {
            newErrors.status = "Status is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (!validateForm()) return; // Stop if validation fails
        try {
            const productData = {
                name: form.name,
                image: form.images.split(',')[0].trim(),
                description: form.description,
                price: parseFloat(form.price),
                category: form.category,
                status: form.status,
                stock: 1
            };
            if (editingId) {
                // Update product
                await updateProduct(editingId, productData); // You need to implement updateProduct in your API
                setSuccess('Product updated successfully!');
            } else {
                // Add new product
                await addProduct(productData);
                setSuccess('Product added successfully!');
            }
            setForm({
                name: '',
                images: '',
                description: '',
                price: '',
                category: '',
                status: 'In Stock'
            });
            setEditingId(null);
            refreshProducts();
        } catch (err) {
            console.error(err);
            setError('Failed to save product.');
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

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            refreshProducts();
        } catch (err) {
            setError('Failed to delete product.');
        }
    };

    const handleEdit = (id) => {
        const product = products.find(p => p._id === id || p.id === id);
        if (product) {
            setForm({
                name: product.name,
                images: product.image || product.images || '',
                description: product.description,
                price: product.price,
                category: product.category,
                status: product.status || 'In Stock'
            });
            setEditingId(id);
            setSuccess('');
            setError('');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        navigate('/admin-login');
    };

    return (
        <div className="admin-page">
            <div className="admin-container">
                <section className="admin-form-section" style={{ position: 'relative' }}>
                    <form className="admin-product-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Product Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                autoComplete="name"
                            />
                            {errors.name && <span className="error-message">{errors.name}</span>}
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
                                autoComplete="photo"
                            />
                            {errors.images && <span className="error-message">{errors.images}</span>}
                            {/* Image preview */}
                            {form.images && (
                                <img
                                    src={
                                        form.images.split(',')[0].trim().startsWith('http')
                                            ? form.images.split(',')[0].trim()
                                            : `/images/${form.images.split(',')[0].trim().replace(/^images\//, '')}`
                                    }
                                    alt="Preview"
                                    style={{ maxWidth: '120px', marginTop: '8px', border: '1px solid #ccc' }}
                                    onError={e => { e.target.src = '/images/Placeholder.png'; }}
                                />
                            )}
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
                                autoComplete="description"
                            />
                            {errors.description && <span className="error-message">{errors.description}</span>}
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
                                autoComplete="off"
                            />
                            {errors.price && <span className="error-message">{errors.price}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category:</label>
                            <select
                                id="category"
                                name="category"
                                required
                                value={form.category}
                                onChange={handleChange}
                                autoComplete="off"
                            >
                                <option value="">Select a Category</option>
                                <option value="Laptops">Laptops</option>
                                <option value="Smartphones">Smartphones</option>
                                <option value="Headphones">Headphones</option>
                                <option value="Cameras">Cameras</option>
                                <option value="Smartwatches">Smartwatches</option>
                            </select>
                            {errors.category && <span className="error-message">{errors.category}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status:</label>
                            <select
                                id="status"
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                required
                                autoComplete="off"
                            >
                                <option value="In Stock">In Stock</option>
                                <option value="Low Stock">Low Stock</option>
                                <option value="Out of Stock">Out of Stock</option>
                            </select>
                            {errors.status && <span className="error-message">{errors.status}</span>}
                        </div>
                        <div className="form-buttons" style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingRight: 0 }}>
                            <button type="submit">{editingId ? 'Update Product' : 'Add Product'}</button>
                            <button type="button" onClick={handleClear}>Clear</button>
                            {editingId && (
                                <button type="button" onClick={() => {
                                    setEditingId(null);
                                    setForm({
                                        name: '',
                                        images: '',
                                        description: '',
                                        price: '',
                                        category: '',
                                        status: 'In Stock'
                                    });
                                    setErrors({});
                                    setError('');
                                    setSuccess('');
                                }}>
                                    Cancel Edit
                                </button>
                            )}
                            <button className="logout-btn" type="button" onClick={handleLogout}>Logout</button>
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
                                                <button className="edit-btn" onClick={() => handleEdit(product._id)}>Edit</button>
                                                <button
                                                    className="delete-btn"
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure you want to delete this product?')) {
                                                            handleDelete(product._id);
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </button>
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