import React from 'react';
// import { Link } from 'react-router-dom'; // Use Link for navigation instead of <a> tags

function Header() {
    return (
    <header className="main-header"> {/* Example: converted class to className */}
        <div className="container">
            <div className="logo">
                <a href="index.html">MyGadgetStore</a>
            </div>

            {/* Navigation links */} 
            <nav className="main-nav">
                <ul className="nav-list">
                    <li><a href="index.html" className="nav-link">Home</a></li>
                    <li><a href="#" className="nav-link" data-category="laptops">Laptops</a></li>
                    <li><a href="#" className="nav-link" data-category="smartphones">Smartphones</a></li>
                    <li><a href="#" className="nav-link" data-category="headphones">Headphones</a></li>
                    <li><a href="#" className="nav-link" data-category="cameras">Cameras</a></li>
                    <li><a href="#" className="nav-link" data-category="all">All Products</a></li>
                </ul>
            </nav>     
 
            <div className="search-bar">
                <input type="text" placeholder="Search products..." className="search-input" />
                <a href="admin.html" className="admin-link">Admin</a>
            </div>
        </div>
    </header> 
    );
}

export default Header;