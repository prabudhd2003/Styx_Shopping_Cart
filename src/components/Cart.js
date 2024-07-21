import React from 'react';

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
  return (
    <div className="cart">
      {cartItems.map(item => (
        <div key={item.product.id} className="cart-item">
          <h4>{item.product.name}</h4>
          <p>{item.product.price}</p>
          <input
            type="number"
            value={item.quantity}
            onChange={e => updateQuantity(item.product, parseInt(e.target.value))}
          />
          <button onClick={() => removeFromCart(item.product)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;