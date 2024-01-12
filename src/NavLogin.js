import React,{ useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
function NavLogin() {
  let navigate = useNavigate();
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


  
  return (
    <div>
      <nav class="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
  <div class="container">
    <a onClick={()=>{ navigate("/")}} class="navbar-brand fw-bold fs-4"  href="#">BOOKSTORE</a>
   
   <div className='buttons'>
   <Link to="/shoppingCart" className='btn btn-outline-light ms-2'>
              <i className='fa fa-shopping-cart me-1'></i>Cart ({cartProducts.length})
            </Link>
    <a href='' onClick={()=>{ navigate("/login")}} className='btn btn-outline-light ms-2'><i className='fa fa-sign-in me-1'></i>Login</a>
    <a href='' onClick={()=>{ navigate("/signup")}} className='btn btn-outline-light ms-2'><i className='fa fa-user-plus me-1'></i>Sign Up</a>
   
   </div>
  </div>
</nav>
    </div>
  )
}

export default NavLogin;
