import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Check if item is already in wishlist on load
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.some((item) => item.id === product.id);
    setIsWishlisted(exists);
  }, [product.id]);

  /**
   * Task 11: Wishlist Toggle Logic
   */
  const toggleWishlist = (e) => {
    e.preventDefault(); // Prevent navigating to details page
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (isWishlisted) {
      wishlist = wishlist.filter((item) => item.id !== product.id);
      setIsWishlisted(false);
    } else {
      wishlist.push(product);
      setIsWishlisted(true);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-link">
        <img
          src={product.images?.[0] || product.image}
          alt={product.title}
          className="product-image"
        />
        <div className="product-card-body">
          <h3>{product.title}</h3>
          <p className="product-price">${product.price}</p>
        </div>
      </Link>

      <div className="product-card-actions">
        <button onClick={() => addToCart(product)} className="primary-btn">
          Add to Cart
        </button>

        <button
          onClick={toggleWishlist}
          className={`secondary-btn wishlist-btn ${isWishlisted ? "active" : ""}`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          ❤
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
