import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../utils/dataHandler';
import { Link } from 'react-router-dom';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);
                const data = await fetchProducts();
                setProducts(data);
                setError(null);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, []);

    if (loading) {
        return <div className="loading-indicator">Loading products...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (products.length === 0) {
        return <div className="no-products-message">No products found.</div>;
    }

    return (
        <main>
            <div className="main-content-container">
                {/* Header section with title and sort options */}
                <div className="product-list-header">
                            <h2 className="page-title">Explore Our Products</h2>
                            <section className="sort-options">
                                <label htmlFor="sortSelect">Sort By:</label> {/* Added a label for accessibility */}
                                <select id="sortSelect" className="sort-dropdown">
                                    <option value="default">Default</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                    <option value="name-asc">Name: A-Z</option>
                                    <option value="name-desc">Name: Z-A</option>
                                </select>
                            </section>
                        </div>            
                {/* This section will now directly contain the ProductCards */}
                <section id="product-list" className="product-grid">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </section>
            </div>
        </main>
    );
}

export default ProductList;