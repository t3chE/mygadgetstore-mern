import React from 'react';
import { Link } from 'react-router-dom'; // Correctly imported Link

function ProductCard({ product }) {
  if (!product) {
    return null;
  }

  return (
    <div className="product-card">
      {/* Link the image to the product detail page */}
      <Link to={`/products/${product.id}`}> {/* This is correct! */}
        <img
          src={product.imageUrl || '/images/placeholder.jpg'}
          alt={product.name}
          className="product-image"
        />
      </Link>
      <h3>
        {/* Link the product title to the product detail page */}
        <Link to={`/products/${product.id}`} className="product-title"> {/* This is also correct! */}
          {product.name}
        </Link>
      </h3>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <button className="add-to-cart-button">Add to Cart</button>

      {/* --- ADD EDIT BUTTON LINK HERE --- */}
      {/* This button will navigate to the edit product form */}
      {/* You might want to make this button conditionally visible (e.g., only for admins) later */}
      <Link to={`/edit/${product.id}`} className="edit-product-button">
        Edit Product
      </Link>

    </div>
  );
}

export default ProductCard;