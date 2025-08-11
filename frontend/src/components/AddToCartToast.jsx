import React from 'react';

export default function AddToCartToast({ show, productName }) {
  if (!show) return null;
  return (
    <div className="add-to-cart-toast">
      <span>Added <strong>{productName}</strong> to cart!</span>
    </div>
  );
}
