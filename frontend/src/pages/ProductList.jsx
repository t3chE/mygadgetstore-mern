import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../utils/api';
import { useParams } from 'react-router-dom'; // Add this import

function ProductList() {
    const { categoryName } = useParams(); // Get category from URL
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getProducts();
                setProducts(data);
                setError(null);
            } catch (err) {
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Filter products by category if categoryName is present
    const filteredProducts = categoryName
        ? products.filter(
            p => p.category && p.category.toLowerCase().replace(/\s/g, '-') === categoryName.toLowerCase()
        )
        : products;

    if (loading) return <div className="loading-indicator">Loading products...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (filteredProducts.length === 0) return <div className="no-products-message">No products found.</div>;

    return (
        <main>
            <div className="main-content-container">
                <div className="product-list-header">
                    <h2 className="page-title">
                        {categoryName
                            ? `Category: ${categoryName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`
                            : 'Explore Our Products'}
                    </h2>
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
                <section id="product-list" className="product-grid">
                    {filteredProducts.map(product => (
                        <ProductCard key={product._id || product.id} product={product} />
                    ))}
                </section>
            </div>
        </main>
    );
}

export default ProductList;