import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import ProductCard from '../Components/ProductCard';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistItems(data);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="empty-state">
        <h2>Your Wishlist is empty</h2>
        <Link to="/">Go find something you love</Link>
      </div>
    );
  }

  return (
    <main className="wishlist-page">
      <h1>Your Wishlist</h1>
      <section className="wishlist-grid">
        {wishlistItems.map((product) => (
          <div key={product.id} className="wishlist-card">
            <ProductCard product={product} />
            <button className="remove-btn" onClick={() => removeFromWishlist(product.id)}>
              Remove from Wishlist
            </button>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Wishlist;
