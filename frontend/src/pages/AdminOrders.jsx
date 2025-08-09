import React, { useEffect, useState } from 'react';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [status, setStatus] = useState('');
  const [actionMsg, setActionMsg] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setError('Failed to fetch orders.');
    }
    setLoading(false);
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setStatus(order.status || 'Pending');
    setActionMsg('');
  };

  const handleStatusUpdate = async () => {
    if (!selectedOrder) return;
    setActionMsg('');
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${selectedOrder._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (res.ok) {
        setActionMsg('Order status updated.');
        fetchOrders();
        setSelectedOrder(data);
      } else {
        setActionMsg(data.error || 'Failed to update order.');
      }
    } catch {
      setActionMsg('Failed to update order.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this order?')) return;
    setActionMsg('');
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        setActionMsg('Order deleted.');
        fetchOrders();
        setSelectedOrder(null);
      } else {
        setActionMsg(data.error || 'Failed to delete order.');
      }
    } catch {
      setActionMsg('Failed to delete order.');
    }
  };

  const handleLogout = () => {
    // Implement logout functionality here
    console.log('Logging out...');
    // Redirect to login page or perform any other logout actions
    window.location.href = '/login';
  };

  return (
    <div className="admin-orders-page">
      <h2>Order Management</h2>
      <button className="return-admin-btn" onClick={() => window.location.href = '/admin'} style={{ marginRight: '1rem' }}>Return to Admin Page</button>
      <button className="logout-btn" type="button" onClick={() => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        window.location.href = '/admin-login';
      }}>Logout</button>
      {loading ? (
        <div>Loading orders...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.customer?.name}</td>
                <td>{order.customer?.email}</td>
                <td>£{order.total.toFixed(2)}</td>
                <td>{order.status || 'Pending'}</td>
                <td>
                  <button className="view-btn" onClick={() => handleView(order)}>View</button>
                  <button onClick={() => handleDelete(order._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedOrder && (
        <div className="order-details-modal">
          <h3>Order Details</h3>
          <p><strong>ID:</strong> {selectedOrder._id}</p>
          <p><strong>Name:</strong> {selectedOrder.customer?.name}</p>
          <p><strong>Email:</strong> {selectedOrder.customer?.email}</p>
          <p><strong>Address:</strong> {selectedOrder.customer?.address}</p>
          <p><strong>Total:</strong> £{selectedOrder.total.toFixed(2)}</p>
          <h4>Items:</h4>
          <ul>
            {selectedOrder.items.map((item, idx) => (
              <li key={idx}>{item.name} x {item.quantity} (£{item.price.toFixed(2)} each)</li>
            ))}
          </ul>
          <div>
            <label>Status: </label>
            <select value={status} onChange={e => setStatus(e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button onClick={handleStatusUpdate}>Update Status</button>
          </div>
          <button onClick={() => setSelectedOrder(null)} style={{ marginTop: '1rem' }}>Close</button>
          {actionMsg && <div className="action-message">{actionMsg}</div>}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
