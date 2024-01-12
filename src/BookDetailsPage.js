import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTheData,addTheProducts } from './redux.js';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar.js';
import './BookDetailsPage.css';

const BookDetailsPage = () => {
  const [books, setBooks] = useState([]);
  const productsArray = useSelector((output) => output.bookstore.productDetails);
  const dispatch = useDispatch();

  function getTheData() {
    dispatch(fetchTheData());
  }

  useEffect(() => {
    getTheData();
  }, []);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    setBooks(productsArray.filter((i) => i.id == id));
  }, [productsArray, id]);

  useEffect(() => {
    console.log(books); // Log books array when it changes
  }, [books]);
  const handleAddToCart = (product) => {
    dispatch(addTheProducts(product));
  };

  return (
    <div>
      <Navbar />
      <section className='detail-section-container'>
        <div className='container'>
          <div className='flex-container'>
            <div className='book-img-container'>
              <img src={books[0]?.image_url} alt="book" />
            </div>
            <div className='book-detail-container'>
              <h2>{books[0]?.title?.toUpperCase()}</h2>
              <p><b>Author : </b>{books[0]?.authors}</p>
              <p><b>Description : </b>{books[0]?.description}</p>
              <p><b>Rating : </b>{books[0]?.rating}</p>
              <p><b>Price : &#8377; {books[0]?.num_pages}</b></p>
              <button onClick={() => handleAddToCart(id)} className='CheckoutBtn'>Add To Cart</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookDetailsPage;
