import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for navigation instead of <a> tags

function Header() {
    return (
    <header className="main-header">
        <div className="container header-flex">
            <div className="search-bar">
                <input type="text" placeholder="Search products..." className="search-input" id="search" />
            </div>

            <div className="logo-nav">
                <div className="logo">
                    <Link to="/">MyGadgetStore</Link>
                </div>

                {/* Navigation links */} 
                <nav className="main-nav">
                    <ul className="nav-list">
                        <li><Link to="/" className="nav-link">Home</Link></li>
                        <li><Link to="/category/laptops" className="nav-link">Laptops</Link></li>
                        <li><Link to="/category/smartphones" className="nav-link">Smartphones</Link></li>
                        <li><Link to="/category/headphones" className="nav-link">Headphones</Link></li>
                        <li><Link to="/category/cameras" className="nav-link">Cameras</Link></li>
                        <li><Link to="/products" className="nav-link">All Products</Link></li>
                    </ul>
                </nav>     
            </div>

            {/* Search bar and admin link */}
            <div className="admin-link-container">
                <Link to="/admin" className="admin-link">Admin</Link>
            </div>
        </div>
    </header> 
    );
}

export default Header;