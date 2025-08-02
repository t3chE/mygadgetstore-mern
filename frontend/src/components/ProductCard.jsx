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
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image || '/images/placeholder.jpg'} // <-- CHANGED THIS LINE: product.image
          alt={product.name}
          className="product-image"
        />
      </Link>
      <h3>
        <Link to={`/products/${product.id}`} className="product-title">
          {product.name}
        </Link>
      </h3>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <button className="add-to-cart-button">Add to Cart</button>

      {/* This button will navigate to the edit product form */}
      <Link to={`/edit/${product.id}`} className="edit-product-button">
        Edit Product
      </Link>
    </div>
  );
}

export default ProductCard;