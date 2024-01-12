import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTheProducts, deleteTheProducts } from './redux';
import Navbar from './Navbar';
import './shoppingCart.css';
import CheckoutForm from './CheckoutForm.js';
import NavLogin from './NavLogin.js';

const ShoppingCart = () => {
  const cartProductsRedux = useSelector((output) => output.shoppingCart.cartProducts);
  let user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Load cartProducts from local storage when the component mounts
  const savedCartProducts = localStorage.getItem('cartProducts');
  const initialCartProducts = cartProductsRedux.length > 0 ? cartProductsRedux : JSON.parse(savedCartProducts);
  const [cartProducts, setCartProducts] = useState(initialCartProducts);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Save cartProducts to local storage whenever it changes
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    updateTotalAmount(cartProducts); // Update total on component mount
  }, [cartProducts]);

  const handleClose = (item) => {
    // Dispatch the deleteTheProducts action
    console.log("item", item);
    let updatedCartProducts = [];
    if (item.qty === 1) {
      updatedCartProducts = cartProducts.filter((x) => x.id !== item.id);
    } else {
      updatedCartProducts = cartProducts.map((x) =>
        x.id === item.id ? { ...x, qty: x.qty - 1 } : x
      );
    }
    dispatch(deleteTheProducts(item));

    // Update the local state directly using the functional form
    setCartProducts(updatedCartProducts);
    updateTotalAmount(updatedCartProducts);
  };

  const handleAddItem = (item) => {
    // Dispatch the addTheProducts action
    dispatch(addTheProducts(item));

    // Update the local state directly using the functional form
    const existingProduct = cartProducts.find((x) => x.id === item.id);

    if (existingProduct) {
      const updatedCartProducts = cartProducts.map((x) =>
        x.id === item.id ? { ...x, qty: x.qty + 1 } : x
      );
      setCartProducts(updatedCartProducts);
      updateTotalAmount(updatedCartProducts);
    } else {
      const updatedCartProducts = [...cartProducts, { ...item, qty: 1 }];
      setCartProducts(updatedCartProducts);
      updateTotalAmount(updatedCartProducts);
    }
  };

  const updateTotalAmount = (updatedCartProducts) => {
    let total = 0;
    updatedCartProducts.forEach((item) => {
      total = total + item.qty * item.num_pages;
    });
    setTotalAmount(total);
  };

  return (
    <>
      {user ? <Navbar /> : <NavLogin />}
      <h1>Shopping Cart</h1>
      {cartProducts.length === 0 && <h2>Your cart is empty!</h2>}

      {cartProducts.length > 0 && (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.image_url} alt="book" />
                </td>
                <td>{item.title}</td>
                <td className='qty-btn'>
                  <button onClick={() => handleAddItem(item)}>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </button>
                  <span>{item.qty}</span>
                  <button onClick={() => handleClose(item)}>
                    <i className="fa fa-minus" aria-hidden="true"></i>
                  </button>
                </td>
                <td>&#8377; {item.qty * item.num_pages}</td>
                <td>
                  <button onClick={() => handleClose(item)}>
                    Remove Item
                  </button>
                </td>
              </tr>
            ))}
            <tr className='totalcart'><td  colSpan={4}><b>Total Cart Value</b></td><td>&#8377; {totalAmount}</td></tr>
          </tbody>
        </table>
      )}
       {cartProducts.length > 0 &&  <CheckoutForm /> }
     
    </>
  );
};

export default ShoppingCart;
