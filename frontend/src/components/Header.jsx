import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom'; // Use Link for navigation instead of <a> tags
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import SearchBox from './SearchBox';

function Header() {
    const { cart } = useCart();
    const location = useLocation();
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const { setSearchQuery } = useSearch();

    const handleSearch = (query) => {
        setSearchQuery(query);
    };
    return (
    <header className="main-header">
        <div className="container header-flex">
            <div className="search-bar">
                <SearchBox onSearch={handleSearch} />
            </div>

            <div className="logo-nav">
                <div className="logo">
                    <Link to="/">MyGadgetStore</Link>
                </div>

                {/* Navigation links */} 
                <nav className="main-nav">
                    <ul className="nav-list">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                end
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/category/laptops"
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                            >
                                Laptops
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/category/smartphones"
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                            >
                                Smartphones
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/category/headphones"
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                            >
                                Headphones
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/category/cameras"
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                            >
                                Cameras
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/category/smartwatches"
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                            >
                                Smartwatches
                            </NavLink>
                        </li>
                    </ul>
                </nav>     
            </div>

            {/* Cart and admin link container - right aligned */}
            <div className="admin-link-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '2.5rem', minWidth: '250px' }}>
                <Link to="/cart" className="cart-link" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  {/* Shopping bag SVG icon */}
                  <span style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                      <path d="M6 2l1.5 2h9L18 2" />
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M9 10v2a3 3 0 0 0 6 0v-2" />
                    </svg>
                                        {cart.items.length > 0 && (
                                              <span className="cart-badge" style={{ left: 'auto', top: '-8px', position: 'absolute' }}>{cart.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                                        )}
                  </span>
                </Link>
                                {isAdmin ? (
                                    location.pathname.startsWith('/admin') ? (
                                        <button className="admin-orders-link" onClick={() => window.location.href = '/admin-orders'}>Manage Orders</button>
                                    ) : (
                                        <Link to="/admin" className="admin-link">Admin</Link>
                                    )
                                ) : (
                                    <Link to="/admin-login" className="admin-link">Login</Link>
                                )}
            </div>
        </div>
    </header> 
    );
}

export default Header;