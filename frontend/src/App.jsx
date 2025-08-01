import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/style.css'; // Your main CSS file

// Import your page components (you'll create these by moving HTML into them)
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import AdminPage from './pages/AdminPage';
// import NotFoundPage from './pages/NotFoundPage'; // Optional for 404

function App() {
  return (
    <Router>
      <Header /> {/* Header will be consistent across pages */}
      <main className="main-content container"> {/* Adjust container as needed */}
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/admin" element={<AdminPage />} />
          {/* Add routes for /add and /edit/:id, potentially within AdminPage or separate */}
          {/* <Route path="*" element={<NotFoundPage />} /> */} {/* Catch-all 404 route */}
        </Routes>
      </main>
      <Footer /> {/* Footer will be consistent across pages */}
    </Router>
  );
}

export default App;
