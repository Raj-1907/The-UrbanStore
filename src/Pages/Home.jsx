import React, { useContext, useState } from 'react';
import { ProductContext } from '../Context/ProductContext';
import CategoryList from '../Components/CategoryList';
import ProductCard from '../Components/ProductCard';

const Home = () => {
  const { products, loading, fetchProducts } = useContext(ProductContext);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const handleLoadMore = () => {
    const nextOffset = offset + limit;
    setOffset(nextOffset);
    fetchProducts(nextOffset, limit);
  };

  if (loading && products.length === 0) return <div className="loader">Loading amazing products...</div>;

  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Brand New Collection</span>
          <h1>Discover premium styles for every season.</h1>
          <p>
            Shop modern, curated fashion with premium quality, fast delivery, and a sleek
            experience designed to look great on every screen.
          </p>
          <div className="hero-buttons">
            <a href="#products" className="cta-pill">Explore Shop</a>
            <a href="#products" className="secondary-btn">View Best Sellers</a>
          </div>
          <div className="hero-features">
            <div className="hero-card">
              <strong>Secure Payment</strong>
              <span>Safe checkout with trusted payments.</span>
            </div>
            <div className="hero-card">
              <strong>Free Delivery</strong>
              <span>Fast shipping on orders over $80.</span>
            </div>
            <div className="hero-card">
              <strong>24/7 Support</strong>
              <span>Always here when you need assistance.</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=80"
            alt="Hero product"
          />
        </div>
      </section>

      <section className="section-heading">
        <h2>New Arrivals</h2>
        <a href="#products">View All</a>
      </section>

      <CategoryList />

      <section id="products" className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

      <div className="section-heading" style={{ justifyContent: 'center' }}>
        <button className="primary-btn" onClick={handleLoadMore}>
          {loading ? 'Loading...' : 'Load More Products'}
        </button>
      </div>
    </main>
  );
};

export default Home;
