import React from 'react';
// import ProductCard from '../components/ProductCard'; // Will import later

function ProductList() {
  return (
<main className="flex-grow container mx-auto p-6 md:p-10 main-content-layout">

        <aside className="sidebar">
            <section className="category-buttons-container mb-6">
                <h3>Filter By Category</h3>
                <div className="category-buttons">
                    <button className="btn" data-category="all">All Products</button>
                    <button className="btn" data-category="laptops">Laptops</button>
                    <button className="btn" data-category="smartphones">Smartphones</button>
                    <button className="btn" data-category="headphones">Headphones</button>
                    <button className="btn" data-category="cameras">Cameras</button>
                </div>
            </section>

            <section className="sort-options">
                <h2>Sort By</h2>
                <select id="sortSelect" class="sort-dropdown">
                    <option value="default">Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A-Z</option>
                    <option value="name-desc">Name: Z-A</option>
                </select>
            </section>
        </aside>

        <section id="product-list" className="product-grid">
            <h2 class="page-title">Explore Our Products</h2>
            <div id="product-cards"></div>    
        </section>
   
    </main>
  );
}

export default ProductList;