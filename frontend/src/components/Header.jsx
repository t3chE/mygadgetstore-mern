import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Use Link for navigation instead of <a> tags

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

            {/* Search bar and admin link */}
            <div className="admin-link-container">
                <Link to="/admin" className="admin-link">Admin</Link>
            </div>
        </div>
    </header> 
    );
}

export default Header;