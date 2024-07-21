import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './styles.css';

import img1 from './images/product1.jpg';
import img2 from './images/product2.jpg';
import img3 from './images/product3.jpg';
import img4 from './images/product4.jpg';
import img5 from './images/product5.jpg';
import img6 from './images/product6.jpg';
import img7 from './images/product7.jpg';
import img8 from './images/product8.jpg';
import img9 from './images/product9.jpg';
import img10 from './images/product10.jpg';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

const generateProducts = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    price: `$Rs {(index + 1) * 5}`,
    image: images[index % images.length]
  }));
};

const App = () => {
  const [products] = useState(generateProducts(25));
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const addToCart = product => {
    setCart(prevCart => {
      const itemIndex = prevCart.findIndex(item => item.product.id === product.id);
      if (itemIndex === -1) {
        return [...prevCart, { product, quantity: 1 }];
      } else {
        const newCart = [...prevCart];
        newCart[itemIndex].quantity += 1;
        return newCart;
      }
    });
  };

  const removeFromCart = product => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== product.id));
  };

  const updateQuantity = (product, quantity) => {
    setCart(prevCart => {
      const itemIndex = prevCart.findIndex(item => item.product.id === product.id);
      const newCart = [...prevCart];
      if (quantity <= 0) {
        return newCart.filter(item => item.product.id !== product.id);
      }
      newCart[itemIndex].quantity = quantity;
      return newCart;
    });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1 className="heading">Prabudhd's Shopping Center</h1>
      <div className="top-bar">
        <Cart cartItems={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
        <button className="checkout-button" onClick={() => setCart([])}>Checkout</button>
      </div>
      <div className="content">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <ProductList products={filteredProducts} addToCart={addToCart} />
      </div>
    </div>
  );
};

export default App;
