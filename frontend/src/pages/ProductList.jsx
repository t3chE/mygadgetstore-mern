import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard'; // Ensure this path is correct, should be .jsx
import { fetchProducts } from '../utils/dataHandler'; // Assuming fetchProducts works for now
import { Link } from 'react-router-dom'; // Import Link if you need it directly here, e.g., for "All Products" button

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null);   // Add error state

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true); // Set loading to true before fetching
                const data = await fetchProducts();
                setProducts(data);
                setError(null); // Clear any previous errors on success
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to load products. Please try again later."); // Set user-friendly error
            } finally {
                setLoading(false); // Set loading to false after fetch attempt
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
        <main className="flex-grow container mx-auto p-6 md:p-10 main-content-layout">

            <aside className="sidebar">
                <section className="category-buttons-container mb-6">
                    <h3>Filter By Category</h3>
                    <div className="category-buttons">
                        {/* You can make these Link components later to navigate to category-specific routes */}
                        <Link to="/" className="btn" data-category="all">All Products</Link> {/* Link to home for "All Products" */}
                        <button className="btn" data-category="laptops">Laptops</button>
                        <button className="btn" data-category="smartphones">Smartphones</button>
                        <button className="btn" data-category="headphones">Headphones</button>
                        <button className="btn" data-category="cameras">Cameras</button>
                    </div>
                </section>

                <section className="sort-options">
                    <h2>Sort By</h2>
                    <select id="sortSelect" className="sort-dropdown"> {/* Changed class to className */}
                        <option value="default">Default</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="name-asc">Name: A-Z</option>
                        <option value="name-desc">Name: Z-A</option>
                    </select>
                </section>
            </aside>

            <section id="product-list" className="product-grid">
                <h2 className="page-title">Explore Our Products</h2> {/* Changed class to className */}
                <div id="product-cards-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Added a container div with grid classes */}
                    {/* Dynamically render ProductCard components */}
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

        </main>
    );
}

export default ProductList;