// src/utils/dataHandler.js
// Assuming products.json exists in your public folder
export const fetchProducts = async () => {
  try {
    const response = await fetch('/products.json'); // Adjust path if needed
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return []; // Return empty array on error
  }
};

// You might also have functions for localStorage, etc.
// export const getProductById = (id) => { /* ... */ };

const LOCAL_STORAGE_KEY = 'myGadgetStoreProducts';

// Function to fetch initial mock data from JSON file
async function fetchInitialProducts() {
    try {
        const response = await fetch('products.json'); // Path to your JSON file
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Could not fetch initial products:", error);
        return []; // Return empty array on error
    }
}

// Function to get products from Local Storage, falling back to JSON file if empty
async function _getProducts() {
    const productsJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (productsJSON) {
        return JSON.parse(productsJSON);
    } else {
        // If Local Storage is empty, load from products.json and save it
        const initialProducts = await fetchInitialProducts();
        if (initialProducts.length > 0) {
            saveProducts(initialProducts);
        }
        return initialProducts;
    }
}

// Function to save products to Local Storage
function saveProducts(products) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
}

// Removed unused function generateProductId to fix unused variable error.