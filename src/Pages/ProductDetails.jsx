import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <div className="loader">Loading...</div>;

  return (
    <main className="product-details-page">
      <section className="details-card">
        <div className="details-media">
          <img src={product.images?.[0] || product.image} alt={product.title} />
        </div>

        <div className="details-copy">
          <span className="badge">Featured Product</span>
          <h1>{product.title}</h1>
          <p className="price">${product.price}</p>
          <p className="desc">{product.description}</p>
          <button className="primary-btn" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;
