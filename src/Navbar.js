import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { userCreator } from './redux';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const cartProductsRedux = useSelector((output) => {
    console.log('navbar products:', output.shoppingCart.cartProducts);
    return output.shoppingCart.cartProducts;
  });

  const savedCartProducts = localStorage.getItem('cartProducts');
  const initialCartProducts = cartProductsRedux.length > 0 ? cartProductsRedux : JSON.parse(savedCartProducts);
  const [cartProducts, setCartProducts] = useState(initialCartProducts);

  useEffect(() => {
    // Save cartProducts to local storage whenever it changes
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // Redirect or navigate to the login page after logout
      dispatch(userCreator(false));
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <div>
      <nav class="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div class="container">
          <Link to="/" class="navbar-brand fw-bold fs-4" href="#">
            BOOKSTORE
          </Link>

          <div className='buttons'>
            <Link to="/shoppingCart" className='btn btn-outline-light ms-2'>
              <i className='fa fa-shopping-cart me-1'></i>Cart ({cartProducts.length})
            </Link>
            <button onClick={handleLogout} className='btn btn-outline-light ms-2'>
              <i className='fa fa-sign-out me-1 '></i>Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
