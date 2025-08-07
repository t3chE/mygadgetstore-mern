import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, addReview } from '../utils/api';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

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

    const handleReviewSubmit = async () => {
        try {
            await addReview(product._id, { rating, text: reviewText });
            setShowReviewForm(false);
            setRating(0);
            setReviewText('');
            // Optionally, refresh product data to show new review
            const updatedProduct = await getProductById(product._id);
            setProduct(updatedProduct);
        } catch (err) {
            alert('Failed to submit review');
        }
    };

    const reviewCount = product && product.reviews ? product.reviews.length : 0;
    const averageRating = reviewCount
        ? (product.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount).toFixed(1)
        : 0;

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
                    <span>
                        {averageRating} / 5&nbsp;
                        {[1,2,3,4,5].map(star => (
                            <span
                                key={star}
                                style={{ color: star <= Math.round(averageRating) ? '#f5b301' : '#ccc', fontSize: '1.2rem' }}
                            >
                                &#9733;
                            </span>
                        ))}
                    </span>
                    (<span id="productDetailReviewCount">{reviewCount}</span> Reviews)
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
                {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((review, idx) => (
                        <article className="review-item" key={idx}>
                            <div className="review-rating">
                                {[1,2,3,4,5].map(star => (
                                    <span
                                        key={star}
                                        style={{ color: star <= review.rating ? '#f5b301' : '#ccc', fontSize: '1.2rem' }}
                                    >
                                        &#9733;
                                    </span>
                                ))}
                            </div>
                            <p className="review-date">
                                {review.date ? new Date(review.date).toLocaleDateString() : ''}
                            </p>
                            <p className="review-text">{review.text}</p>
                        </article>
                    ))
                ) : (
                    <p>No reviews yet. Be the first to write one!</p>
                )}
            </div>
            <button className="write-review-btn" onClick={() => setShowReviewForm(true)}>
                Write a Review
            </button>
        </section>
        {showReviewForm && (
    <div className="review-modal">
        <h3>Write a Review</h3>
        <div className="star-rating">
            {[1,2,3,4,5].map(star => (
                <span
                    key={star}
                    style={{ cursor: 'pointer', color: star <= rating ? '#f5b301' : '#ccc', fontSize: '1.5rem' }}
                    onClick={() => setRating(star)}
                >
                    &#9733;
                </span>
            ))}
        </div>
        <textarea
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
            placeholder="Your review..."
            rows={4}
        />
        <button onClick={handleReviewSubmit}>Submit Review</button>
        <button onClick={() => setShowReviewForm(false)}>Cancel</button>
    </div>
)}
    </main>
    );
}

export default ProductDetail;