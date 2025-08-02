import React from 'react';

function ProductDetail() {
  // In the future, this component will likely fetch product details based on a URL parameter (e.g., product ID)
  return (
<main className="main-content container product-detail-page">
        <section className="product-detail-section">
            <div className="product-gallery">
                <img src="images/placeholder_laptop_large.jpg" alt="[Product Name] - Main" className="main-product-image" id="productMainImage" />
                <div className="thumbnail-gallery" id="productThumbnails">
                    <img src="images/placeholder_laptop_thumb1.jpg" alt="[Product Name] - Thumb 1" className="thumbnail active" data-full-image="images/placeholder_laptop_large.jpg" />
                    <img src="images/placeholder_laptop_thumb2.jpg" alt="[Product Name] - Thumb 2" className="thumbnail" data-full-image="images/placeholder_laptop_large2.jpg" />
                    <img src="images/placeholder_laptop_thumb3.jpg" alt="[Product Name] - Thumb 3" className="thumbnail" data-full-image="images/placeholder_laptop_large3.jpg" />
                </div>
            </div>

            <div className="product-info">
                <h1 className="product-title" id="productDetailName">[Product Name]</h1>
                <p className="product-price" id="productDetailPrice">£[Price]</p>
                <p className="product-category">Category: <span id="productDetailCategory">[Category Name]</span></p>
                <p className="product-availability" id="productDetailAvailability">Availability: [In Stock]</p>
                <div className="product-rating-detail">
                    <span id="productDetailRatingStars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                    (<span id="productDetailReviewCount">XX</span> Reviews)
                </div>

                <p className="product-description" id="productDetailDescription">
                    [Full Product Description goes here. This should be a detailed paragraph or
                    multiple paragraphs explaining the features, benefits, and specifications of the product.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.]
                </p>

                <button className="add-to-cart-btn">Add to Cart</button>
            </div>
        </section>

        <section className="product-reviews-section">
            <h2>Customer Reviews</h2>
            <div className="reviews-list" id="productReviewsList">
                <article className="review-item">
                    <h4 className="reviewer-name">Reviewer Name 1</h4>
                    <div className="review-rating">&#9733;&#9733;&#9733;&#9733;&#9734;</div>
                    <p className="review-date">Date: July 5, 2025</p>
                    <p className="review-text">"This product is amazing! Exceeded my expectations in every way. Highly recommend it."</p>
                </article>

                <article className="review-item">
                    <h4 className="reviewer-name">Reviewer Name 2</h4>
                    <div className="review-rating">&#9733;&#9733;&#9733;&#9734;&#9734;</div>
                    <p className="review-date">Date: June 28, 2025</p>
                    <p className="review-text">"Good product, but the battery life could be better. Still happy with my purchase."</p>
                </article>
            </div>
            <button className="write-review-btn">Write a Review</button>
        </section>
    </main>
    );
}

export default ProductDetail;