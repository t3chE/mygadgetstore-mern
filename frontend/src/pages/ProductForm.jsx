import React from 'react';

function ProductForm() {
  return (
    <form id="productForm" class="product-form">
                    <input type="hidden" id="productId" name="id" /> <div class="form-group">
                                            <label for="productName">Product Name:</label>
                                            <input type="text" id="productName" name="name" required />
                                            <span class="error-message" id="nameError"></span>
                                        </div>

                    <div class="form-group">
                        <label for="productImages">Image URLs (comma-separated):</label>
                        <input type="text" id="productImages" name="images" placeholder="e.g., images/pic1.jpg,images/pic2.jpg" required />
                        <span class="error-message" id="imagesError"></span>
                    </div>

                    <div class="form-group">
                        <label for="productDescription">Description:</label>
                        <textarea id="productDescription" name="description" rows="5" required></textarea>
                        <span class="error-message" id="descriptionError"></span>
                    </div>

                    <div class="form-group">
                        <label for="productPrice">Price (£):</label>
                        <input type="number" id="productPrice" name="price" step="0.01" min="0" required />
                        <span class="error-message" id="priceError"></span>
                    </div>

                    <div class="form-group">
                        <label for="productCategory">Category:</label>
                        <select id="productCategory" name="category" required>
                            <option value="">Select a Category</option>
                            <option value="Laptops">Laptops</option>
                            <option value="Smartphones">Smartphones</option>
                            <option value="Headphones">Headphones</option>
                            <option value="Cameras">Cameras</option>
                            </select>
                        <span class="error-message" id="categoryError"></span>
                    </div>

                    <div class="form-group">
                        <label for="productAvailability">Availability Status:</label>
                        <select id="productAvailability" name="availability" required>
                            <option value="In Stock">In Stock</option>
                            <option value="Low Stock">Low Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="productRatings">Rating (0-5, optional):</label>
                        <input type="number" id="productRatings" name="ratings" step="0.1" min="0" max="5" />
                        <span class="error-message" id="ratingsError"></span>
                    </div>

                    <div class="form-group">
                        <label for="productReviews">Number of Reviews (optional):</label>
                        <input type="number" id="productReviews" name="reviews" min="0" />
                        <span class="error-message" id="reviewsError"></span>
                    </div>

                    <div class="form-actions">
                        <button type="submit" id="submitBtn">Add Product</button>
                        <button type="button" id="clearFormBtn" class="secondary-btn">Clear Form</button>
                    </div>
                </form>
      );
}

export default ProductForm;            