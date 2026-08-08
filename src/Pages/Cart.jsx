import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, updateQuantity, removeItem, totalPrice, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const proceededData = JSON.stringify(cart);
    localStorage.setItem('Proceeded products', proceededData);
    alert("Order Proceeded Successfully! Data saved to 'Proceeded products'.");
    setCart([]);
    localStorage.removeItem('cart');
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="empty-state">
        <h2>Your cart is empty</h2>
        <Link to="/">Go Shopping</Link>
      </div>
    );
  }

  return (
    <main className="cart-page">
      <h1>Your Shopping Cart</h1>
      <section className="cart-grid">
        <div className="cart-items">
          {cart.map((item) => (
            <article key={item.id} className="cart-item">
              <div className="cart-item-media">
                <img src={item.images?.[0] || item.image} alt={item.title} />
              </div>
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>${item.price}</p>
                <div className="qty-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
              </div>
              <button className="remove-btn" onClick={() => removeItem(item.id)}>
                Remove
              </button>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <h3>Order Summary</h3>
          <hr />
          <div className="summary-row">
            <span>Total:</span>
            <span className="total-price">${totalPrice.toFixed(2)}</span>
          </div>
          <button className="summary-button" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </aside>
      </section>
    </main>
  );
};

export default Cart;
