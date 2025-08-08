import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, dispatch } = useCart();
  const [customer, setCustomer] = useState({ name: '', email: '', address: '' });
  const [orderStatus, setOrderStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const handleCheckout = async () => {
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

  if (cart.items.length === 0) {
    return <div className="cart-empty">Your cart is empty.</div>;
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
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
        />
        <input
          type="email"
          placeholder="Email"
          value={customer.email}
          onChange={e => setCustomer({ ...customer, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={customer.address}
          onChange={e => setCustomer({ ...customer, address: e.target.value })}
          required
        />
        <button className="checkout-btn" onClick={handleCheckout} disabled={loading}>
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
        {orderStatus && <div className="order-status">{orderStatus}</div>}
      </div>
    </div>
  );
}
