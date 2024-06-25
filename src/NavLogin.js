import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NavLogin() {
  const navigate = useNavigate();
  
  // Using useSelector to get cartProductsRedux from Redux store
  const cartProductsRedux = useSelector((state) => state.shoppingCart.cartProducts);

  // Initialize cartProducts with empty array if cartProductsRedux is null or undefined
  const initialCartProducts = cartProductsRedux || [];

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
          <a onClick={() => navigate("/")} className="navbar-brand fw-bold fs-4" href="#">
            BOOKSTORE
          </a>
          <div className='buttons'>
            <Link to="/shoppingCart" className='btn btn-outline-light ms-2'>
              <i className='fa fa-shopping-cart me-1'></i>Cart ({cartProducts.length})
            </Link>
            <a href='' onClick={() => navigate("/login")} className='btn btn-outline-light ms-2'>
              <i className='fa fa-sign-in me-1'></i>Login
            </a>
            <a href='' onClick={() => navigate("/signup")} className='btn btn-outline-light ms-2'>
              <i className='fa fa-user-plus me-1'></i>Sign Up
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavLogin;
