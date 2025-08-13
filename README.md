# myGadgetStore MERN

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)


## Overview
**myGadgetStore** is a full-stack e-commerce website built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to browse products, add items to their cart, and provides admins with tools to manage products and orders.


## Features <!------------------------------------------------------------------------------------->
- Product listing and details
- Add to cart and checkout
- Admin login and dashboard
- Product management (add, edit, delete)
- Order management (view, update status, delete)
- Responsive design for desktop and mobile


## Tech Stack <!----------------------------------------------------------------------------------->
- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Other:** JWT (authentication), Mongoose


## Installation & Setup <!------------------------------------------------------------------------->

### Prerequisites
- Node.js (v18+)
- MongoDB (local or cloud)
- npm

### Clone the Repository

1. **Clone the repository**
```bash
git clone https://github.com/t3chE/mygadgetstore-mern.git
cd mygadgetstore-mern
```

2. **Install dependencies**
**Backend:**
- Navigate to the `backend` directory and install dependencies:
```bash
cd backend
npm install
```
**Frontend**
```bash
cd ../frontend
npm install
```

3. **Configure environment variables**
- Create a `.env` file in the `backend` directory.
- Add the following variables (update values as needed):

```env
MONGO_URI=mongodb://localhost:27017/mygadgetstore
PORT=5000
```

4. **Start the backend server**
- In the `backend` directory, run:
```bash
npm start
```
This will start the backend API on the port specified in your `.env` file (default: `5000`).

5. **Start the frontend**
```bash
cd ../frontend
npm run dev
```

6. **Access the App**

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend:** [http://localhost:5000](http://localhost:5000)


## Usage <!---------------------------------------------------------------------------------------->
- Browse products and add items to your cart.
- Proceed to checkout and place orders.
- Admins can log in at `/admin-login` to manage products and orders.

## Configuration
- MongoDB connection string and server port are set in `backend/.env`.
- Update other settings as needed for your environment.

## API Endpoints
- `POST /api/products` — Add a product
- `GET /api/products` — List products
- `PUT /api/products/:id` — Update a product
- `DELETE /api/products/:id` — Delete a product
- `POST /api/orders` — Create an order
- `GET /api/orders` — List orders
- `PUT /api/orders/:id` — Update order status
- `DELETE /api/orders/:id` — Delete an order

## Screenshots
<!-- Add screenshots or GIFs below -->
- Homepage
- Admin Dashboard

## Troubleshooting
- Ensure MongoDB is running.
- Check the terminal for errors.
- Restart servers after code changes.
- For CORS issues, review backend configuration.


## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.

## Contact
**Author:** t3chE  
**Email:** techE@spotmail.com

## Acknowledgements
- [React](https://react.dev/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Vite](https://vitejs.dev/)
- [Mongoose](https://mongoosejs.com/)
