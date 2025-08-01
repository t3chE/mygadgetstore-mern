import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

// The ProductCard component now accepts a 'product' prop
function ProductCard({ product }) {
  // Ensure 'product' exists before trying to access its properties
  if (!product) {
    return null; // Or some placeholder
  }

  return (
     <div className="product-card">
      <Link to={`/products/${product.id}`}> {/* Use Link for navigation to product detail */}
        <img
          src={product.imageUrl || '/images/placeholder.jpg'} // Use product.imageUrl or a fallback
          alt={product.name}
          className="product-image"
        />
      </Link>
      <h3>
        <Link to={`/products/${product.id}`} className="product-title">
          {product.name} {/* Display product name dynamically */}
        </Link>
      </h3>
      <p className="product-price">${product.price.toFixed(2)}</p> {/* Display price dynamically */}
      <button className="add-to-cart-button">Add to Cart</button>
    </div>
  );
}

export default ProductCard;