import React from 'react';
// import ProductForm from '../components/ProductForm'; // Will import later

function AdminPage() {
  return (
    <main className="main-content container admin-page">
            <h1 className="page-title">Admin Panel: Product Management</h1>

            <section className="admin-form-section">
                <h2 id="formTitle">Add New Product</h2>
                <form id="productForm" className="product-form">
                    <input type="hidden" id="productId" name="id" />
                    <div className="form-group">
                        <label htmlFor="productName">Product Name:</label>
                        <input type="text" id="productName" name="name" required />
                        <span className="error-message" id="nameError"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="productImages">Image URLs (comma-separated):</label>
                        <input type="text" id="productImages" name="images" placeholder="e.g., images/pic1.jpg,images/pic2.jpg" required />
                        <span className="error-message" id="imagesError"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="productDescription">Description:</label>
                        <textarea id="productDescription" name="description" rows="5" required></textarea>
                        <span className="error-message" id="descriptionError"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="productPrice">Price (£):</label>
                        <input type="number" id="productPrice" name="price" step="0.01" min="0" required />
                        <span className="error-message" id="priceError"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="productCategory">Category:</label>
                        <select id="productCategory" name="category" required>
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
                        <select id="productAvailability" name="availability" required>
                            <option value="In Stock">In Stock</option>
                            <option value="Low Stock">Low Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="productRatings">Rating (0-5, optional):</label>
                        <input type="number" id="productRatings" name="ratings" step="0.1" min="0" max="5" />
                        <span className="error-message" id="ratingsError"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="productReviews">Number of Reviews (optional):</label>
                        <input type="number" id="productReviews" name="reviews" min="0" />
                        <span className="error-message" id="reviewsError"></span>
                    </div>

                    <div className="form-actions">
                        <button type="submit" id="submitBtn">Add Product</button>
                        <button type="button" id="clearFormBtn" className="secondary-btn">Clear Form</button>
                    </div>
                </form>
            </section>

            <section className="admin-product-list">
                <h2>Current Products</h2>
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
        </main>
    );
}        
export default AdminPage;

        