// server.js
// This is the main entry point for the Express.js backend.

// Import the express library
const express = require('express');
// Import the cors library to handle Cross-Origin Resource Sharing
const cors = require('cors');

// Initialize the Express application
const app = express();

// Define the port the server will run on.
// Use process.env.PORT for production or a default port for development.
const PORT = process.env.PORT || 5000;

// --- Middleware Setup ---

// Enable CORS for all routes and origins. This is crucial for
// allowing the frontend (on a different port) to make requests to this backend.
app.use(cors());

// Enable the express.json() middleware to parse JSON request bodies.
// This is necessary to handle POST and PUT requests from the frontend.
app.use(express.json());

// --- Routes ---

// A simple test route to ensure the server is up and running.
// When you visit http://localhost:5000/ in your browser, you should see this message.
app.get('/', (req, res) => {
  res.send('Product Catalogue Backend is running!');
});

// We will add the product routes (for CRUD operations) here later.
// For example:
// app.use('/api/products', productRoutes);

// --- Server Start ---

// Start the server and make it listen for incoming requests on the specified port.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Open your browser and navigate to http://localhost:5000/ to see the welcome message.');
});