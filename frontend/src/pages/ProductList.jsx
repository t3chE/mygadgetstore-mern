import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../utils/api';
import { useParams } from 'react-router-dom'; // Add this import
import { useSearch } from '../context/SearchContext';

function ProductList() {
    const { categoryName } = useParams(); // Get category from URL
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOption, setSortOption] = useState('default');
    const { searchQuery } = useSearch();

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
    let filteredProducts = categoryName
        ? products.filter(
            p => p.category && p.category.toLowerCase().replace(/\s/g, '-') === categoryName.toLowerCase()
        )
        : products;

    // Further filter by search query from context
    if (searchQuery && searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        filteredProducts = filteredProducts.filter(
            p =>
                (p.name && p.name.toLowerCase().includes(q)) ||
                (p.description && p.description.toLowerCase().includes(q))
        );
    }

    let sortedProducts = [...filteredProducts];
    if (sortOption === 'price-asc') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
        sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name-asc') {
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'name-desc') {
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

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
                                <select
                                    id="sortSelect"
                                    className="sort-dropdown"
                                    value={sortOption}
                                    onChange={e => setSortOption(e.target.value)}
                                >
                                    <option value="default">Default</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                    <option value="name-asc">Name: A-Z</option>
                                    <option value="name-desc">Name: Z-A</option>
                                </select>
                            </section>
                </div>
                <section id="product-list" className="product-grid">
                    {sortedProducts.map(product => (
    <ProductCard key={product._id || product.id} product={product} />
))}
                </section>
            </div>
        </main>
    );
}

export default ProductList;