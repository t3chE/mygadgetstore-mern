import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

function validateCustomer(customer) {
  const errors = {};
  if (!customer.name.trim()) errors.name = 'Name is required.';
  if (!customer.email.trim()) errors.email = 'Email is required.';
  else if (!/^\S+@\S+\.\S+$/.test(customer.email)) errors.email = 'Email is invalid.';
  if (!customer.address.trim()) errors.address = 'Address is required.';
  return errors;
}

export default function Cart() {
  const { cart, dispatch } = useCart();
  const [customer, setCustomer] = useState({ name: '', email: '', address: '' });
  const [orderStatus, setOrderStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [orderDetails, setOrderDetails] = useState(null);

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const handleCheckout = async () => {
    const validationErrors = validateCustomer(customer);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setLoading(true);
    setOrderStatus('');
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.items.map(item => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          total: cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
          customer,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setOrderStatus('Order placed successfully!');
        setOrderDetails(data.order);
        dispatch({ type: 'CLEAR_CART' });
        setCustomer({ name: '', email: '', address: '' });
      } else {
        setOrderStatus(data.error || 'Order failed.');
      }
    } catch (err) {
      setOrderStatus('Order failed.');
    }
    setLoading(false);
  };

  if (cart.items.length === 0 && !orderDetails) {
    return <div className="cart-empty">Your cart is empty.</div>;
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {orderDetails ? (
        <div className="order-confirmation">
          <h3>Thank you for your order!</h3>
          <p>Order ID: {orderDetails._id}</p>
          <p>Name: {orderDetails.customer.name}</p>
          <p>Email: {orderDetails.customer.email}</p>
          <p>Address: {orderDetails.customer.address}</p>
          <h4>Items:</h4>
          <ul>
            {orderDetails.items.map((item, idx) => (
              <li key={idx}>{item.name} x {item.quantity} (£{item.price.toFixed(2)} each)</li>
            ))}
          </ul>
          <p><strong>Total: £{orderDetails.total.toFixed(2)}</strong></p>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {cart.items.map(item => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} style={{ width: 60, height: 60, objectFit: 'cover' }} />
                <span>{item.name}</span>
                <span>£{item.price.toFixed(2)}</span>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={e => handleQuantityChange(item.id, Number(e.target.value))}
                  style={{ width: 50 }}
                />
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            Total: £{cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
          </div>
          <div className="checkout-form">
            <h3>Checkout</h3>
            <input
              type="text"
              placeholder="Name"
              value={customer.name}
              onChange={e => setCustomer({ ...customer, name: e.target.value })}
              required
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
            <input
              type="email"
              placeholder="Email"
              value={customer.email}
              onChange={e => setCustomer({ ...customer, email: e.target.value })}
              required
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
            <input
              type="text"
              placeholder="Address"
              value={customer.address}
              onChange={e => setCustomer({ ...customer, address: e.target.value })}
              required
              className={errors.address ? 'input-error' : ''}
            />
            {errors.address && <div className="error-message">{errors.address}</div>}
            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={loading || Object.keys(validateCustomer(customer)).length > 0}
            >
              {loading ? (
                <span className="spinner"></span>
              ) : 'Place Order'}
            </button>
            {orderStatus && <div className="order-status">{orderStatus}</div>}
          </div>
        </>
      )}
    </div>
  );
}
