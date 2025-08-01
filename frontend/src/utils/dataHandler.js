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