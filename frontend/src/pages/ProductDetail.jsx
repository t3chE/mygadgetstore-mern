import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../utils/api';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchProduct() {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (err) {
                setError('Product not found.');
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return null;

    return (
<main className="main-content container product-detail-page">
        <section className="product-detail-section">
            <div className="product-gallery">
                <img
                    src={product.image ? `/images/${product.image.replace(/^images\//, '')}` : '/images/Placeholder.png'}
                    alt={product.name}
                    className="main-product-image"
                />
            </div>
            <div className="product-info">
                <h1 className="product-title">{product.name}</h1>
                <p className="product-price">£{product.price.toFixed(2)}</p>
                <p className="product-category">Category: <span>{product.category}</span></p>
                <p className="product-availability">Availability: {product.availability ? 'In Stock' : 'Out of Stock'}</p>
                <div className="product-rating-detail">
                    <span id="productDetailRatingStars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                    (<span id="productDetailReviewCount">XX</span> Reviews)
                </div>

                <p className="product-description" id="productDetailDescription">
                    {product.description}
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