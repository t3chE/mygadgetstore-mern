import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/style.css'; // Your main CSS file

// Import your page components (you'll create these by moving HTML into them)
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import AdminPage from './pages/AdminPage';
import ProductForm from './pages/ProductForm'; // <-- NEW: Assuming you'll create this component
import NotFoundPage from './pages/NotFoundPage'; // <-- NEW: Assuming you'll create this component


function App() {
  return (
    <Router>
      <Header /> {/* Header will be consistent across pages */}
      <main className="main-content container"> {/* Adjust container as needed */}
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/admin" element={<AdminPage />} />
          {/* Admin routes: It's good practice to group them or place them logically */}
          {/* The /add route for creating a new product */}
          <Route path="/add" element={<ProductForm />} />
          {/* The /edit/:id route for updating an existing product */}
          <Route path="/edit/:id" element={<ProductForm />} />

           {/* Catch-all 404 route - ALWAYS place this last */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer /> {/* Footer will be consistent across pages */}
    </Router>
  );
}

export default App;
