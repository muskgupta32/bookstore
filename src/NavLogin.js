import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NavLogin() {
  const navigate = useNavigate();
  
  // Fetching cartProductsRedux from Redux store
  const cartProductsRedux = useSelector(state => state.shoppingCart.cartProducts);

  // Initialize cartProducts with local storage or empty array if cartProductsRedux is null
  const savedCartProducts = localStorage.getItem('cartProducts');
  const initialCartProducts = cartProductsRedux || (savedCartProducts ? JSON.parse(savedCartProducts) : []);

  // State to manage cart products locally
  const [cartProducts, setCartProducts] = useState(initialCartProducts);

  // Effect to sync cartProducts with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

  return (
    <div>
      <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container">
          <Link to="/" className="navbar-brand fw-bold fs-4">
            BOOKSTORE
          </Link>
          <div className='buttons'>
            <Link to="/shoppingCart" className='btn btn-outline-light ms-2'>
              <i className='fa fa-shopping-cart me-1'></i>Cart ({cartProducts.length})
            </Link>
            <Link to="/login" className='btn btn-outline-light ms-2'>
              <i className='fa fa-sign-in me-1'></i>Login
            </Link>
            <Link to="/signup" className='btn btn-outline-light ms-2'>
              <i className='fa fa-user-plus me-1'></i>Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavLogin;
