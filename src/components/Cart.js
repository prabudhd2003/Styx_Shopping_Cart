import React from 'react';
import './Cart.css';

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
  // Calculate total cost
  const totalCost = cartItems.reduce((total, { product, quantity }) => {
    return total + parseFloat(product.price.replace('Rs ', '').replace('$', '')) * quantity;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <img src="https://img.icons8.com/ios/50/000000/shopping-cart.png" alt="Empty Cart Icon" />
        <p>Cart is empty</p>
      </div>
    );
  }

  return (
    <div className="cart">
      {cartItems.map(({ product, quantity }) => (
        <div key={product.id} className="cart-item">
          <img src={product.image} alt={product.name} className="cart-item-image" />
          <h4>{product.name}</h4>
          <p>Price: Rs {product.price.replace('$', '')}</p> {/* Ensure no $ symbol */}
          <input
            type="number"
            value={quantity}
            onChange={e => updateQuantity(product, parseInt(e.target.value, 10))}
            min="1"
          />
          <button onClick={() => removeFromCart(product)}>Remove</button>
        </div>
      ))}
      <div className="cart-total">
        <h3>Total Cost: Rs {totalCost.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Cart;
