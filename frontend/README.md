myGadgetStore MERN
Table of Contents
Overview
Features
Tech Stack
Installation & Setup
Usage
Configuration
API Endpoints
Screenshots
Troubleshooting
Contributing
License
Contact
Acknowledgements
Overview
myGadgetStore is a full-stack e-commerce website built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to browse products, add to cart, and admins to manage products and orders.

Features
Product listing and details
Add to cart and checkout
Admin login and dashboard
Product management (add, edit, delete)
Order management (view, update status, delete)
Responsive design for desktop and mobile
Tech Stack
Frontend: React, Vite, CSS
Backend: Node.js, Express
Database: MongoDB
Other: JWT (authentication), Mongoose
Installation & Setup
Prerequisites
Node.js (v18+)
MongoDB (local or cloud)
npm
Steps
Clone the repository

Install dependencies

Backend:
Frontend:
Configure environment variables

Create a .env file in the backend folder:
Start the backend

Start the frontend

Access the app

Frontend: http://localhost:5173
Backend: http://localhost:5000
Usage
Browse products and add to cart.
Checkout and place orders.
Admins can log in at /admin-login to manage products and orders.
Configuration
MongoDB connection string and server port are set in backend/.env.
Update other settings as needed.
API Endpoints
POST /api/products - Add product
GET /api/products - List products
PUT /api/products/:id - Update product
DELETE /api/products/:id - Delete product
POST /api/orders - Create order
GET /api/orders - List orders
PUT /api/orders/:id - Update order status
DELETE /api/orders/:id - Delete order
Screenshots
<!-- Add screenshots or GIFs here -->
Homepage Admin Dashboard

Troubleshooting
Ensure MongoDB is running.
Check terminal for errors.
Restart servers after code changes.
For CORS issues, check backend configuration.
Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

License
MIT

Contact
Author: t3chE
Email: techE@spotmail.com
Acknowledgements
React
Express
MongoDB
Vite
Mongoose
Just copy and paste this into your README.md file. VS Code and GitHub will render it with headings, lists, code blocks, and links as shown above!6. Access the app

Frontend: http://localhost:5173
Backend: http://localhost:5000
Usage
Browse products and add to cart.
Checkout and place orders.
Admins can log in at /admin-login to manage products and orders.
Configuration
MongoDB connection string and server port are set in backend/.env.
Update other settings as needed.
API Endpoints
POST /api/products - Add product
GET /api/products - List products
PUT /api/products/:id - Update product
DELETE /api/products/:id - Delete product
POST /api/orders - Create order
GET /api/orders - List orders
PUT /api/orders/:id - Update order status
DELETE /api/orders/:id - Delete order
Screenshots
<!-- Add screenshots or GIFs here -->
Homepage Admin Dashboard

Troubleshooting
Ensure MongoDB is running.
Check terminal for errors.
Restart servers after code changes.
For CORS issues, check backend configuration.
Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

License
MIT

Contact
Author: t3chE
Email: techE@spotmail.com
Acknowledgements

React
Express
MongoDB
Vite
Mongoose