import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import ProductDetails from './Pages/ProductDetails';
import Cart from './Pages/Cart';
import AdminForm from './Components/AdminForm';
import Wishlist from './Pages/Wishlist';

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <Router>
          <Navbar /> {/* Task 5: Navbar stays visible across all pages */}
          <Routes>
            {/* Task 1 & 2: Home page with grid and categories */}
            <Route path="/" element={<Home />} />
            
            {/* Task 4: Individual Landing Page */}
            <Route path="/product/:id" element={<ProductDetails />} />
            
            {/* Task 7: Cart Management */}
            <Route path="/cart" element={<Cart />} />
            
            <Route path="/wishlist" element={<Wishlist />} />
            {/* Your Custom Requirement: Manual Product Listing */}
            <Route path="/admin" element={<AdminForm />} />
            {/* // Inside your <Routes> in App.jsx */}
          </Routes>
        </Router>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
