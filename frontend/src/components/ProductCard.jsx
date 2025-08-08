import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { useCart } from '../context/CartContext'; // Import useCart from CartContext

// The ProductCard component now accepts a 'product' prop
function ProductCard({ product }) {
    const { dispatch } = useCart(); // Get dispatch function from CartContext

    const imagePath = product.image
        ? `/images/${product.image.replace(/^images\//, '')}`
        : '/images/Placeholder.png';

    console.log('Product:', product);
    console.log('Computed imagePath:', imagePath);

    // Ensure 'product' exists before trying to access its properties
    if (!product) return null;

    return (
        <div className="product-card">
            <Link to={`/products/${product._id || product.id}`}>
                <img
                    src={imagePath}
                    alt={product.name}
                    className="product-image"
                />
            </Link>
            <div className="product-card-content"> {/* Add a content wrapper for padding and flex */}
                <h3>
                    <Link to={`/products/${product._id || product.id}`} className="product-card-name">
                        {product.name}
                    </Link>
                </h3>
                <p className="product-price">£{product.price.toFixed(2)}</p>
                <button className="add-to-cart-button" onClick={() => dispatch({ type: 'ADD_ITEM', payload: {
                    id: product._id || product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image || '',
                } })}>Add to Cart</button>
            </div>
        </div>
    );
}

export default ProductCard;