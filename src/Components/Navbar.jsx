import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext";
import { CartContext } from "../Context/CartContext";

const Navbar = () => {
  const { searchProducts } = useContext(ProductContext);
  const { cart } = useContext(CartContext);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    searchProducts(query); // Task 5: Search API call
    navigate("/");
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="site-nav">
      <Link to="/" className="brand-logo">
        The Urban Store
      </Link>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      <div className="nav-actions">
        <Link to="/admin">List Product</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/cart" className="cta-pill">
          Cart ({cartCount})
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
