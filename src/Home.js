import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './home.css';
import { fetchTheData, addTheProducts } from './redux.js';
import AllProducts from './AllProducts.js';
import NavLogin from './NavLogin.js';

const Home = () => {
  const [genre, setGenre] = useState('All');
  const [data, setData] = useState('');
  const [searchData, setSearchData] = useState('');
  let user = useSelector((state) => state.user);
  if (user) {
    console.log("user exists", user);
  }

  let navigate = useNavigate();
  const productsArray = useSelector(function (output) {
    return output.bookstore.productDetails;
  });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();

  function getTheData() {
    dispatch(fetchTheData());
  }

  useEffect(() => {
    getTheData();
  }, []);

  const handleAddToCart = (product) => {
    return (dispatch) => {
      console.log("Adding to cart:", product);
      dispatch(addTheProducts(product));
    };
  };
  const handleSearch = () => {
    setSearchData(data);
  };

  useEffect(() => {
    setFilteredProducts(
      productsArray.filter((i) => {
        const titleIncludesSearch = i.title.toLowerCase().includes(searchData.trim().toLowerCase());
        const genreMatches = i.genres.includes(genre);

        if (searchData !== '' && titleIncludesSearch) {
          console.log("title", i.title);
          return true;
        } else if (genreMatches) {
          console.log("genre", genre);
          return true;
        }

        return false;
      })
    );
  }, [searchData, genre, productsArray]);

  useEffect(() => {
    console.log("filteredarray:", filteredProducts);
  }, [filteredProducts]);

  return (
    <div>
      {user ? <Navbar /> : <NavLogin />}
      <div className="main-card card text-bg-dark text-white border-0" >

        <img src="/assets/bg.jpg" className="card-img" alt="background" height="100%" />
        <div className="card-img-overlay d-flex flex-column justify-content-center align-items-center p-0">
          <div className="container">
            <h2 className="card-title display-3 fw-bolder mb-4">Find Your Book of Choice</h2>
            <div className="input-group mb-3 mx-auto w-50">
              <input
                onChange={(event) => setData(event.target.value)}
                type="text"
                className="form-control"
                placeholder="Search..."
                aria-label="search"
                aria-describedby="button-addon2"
              />
              <button
                onClick={() => {
                  handleSearch();
                  console.log("searchData:", searchData);
                }}
                className="btn btn-outline-secondary bg-dark text-white"
                type="button"
                id="button-addon2"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="genre d-flex justify-content-center mb-5 pb-5">
        <button onClick={() => { setGenre('All'); setSearchData("") }} className={`btn btn-outline-dark me-2 ${genre === 'All' && 'active'}`}>
          All
        </button>
        <button onClick={() => { setGenre('Romance'); setSearchData("") }} className={`btn btn-outline-dark me-2 ${genre === 'Romance' && 'active'}`}>
          Romance
        </button>
        <button onClick={() => { setGenre('Horror'); setSearchData("") }} className={`btn btn-outline-dark me-2 ${genre === 'Horror' && 'active'}`}>
          Horror
        </button>
        <button onClick={() => { setGenre('Fantasy'); setSearchData("") }} className={`btn btn-outline-dark me-2 ${genre === 'Fantasy' && 'active'}`}>
          Fantasy
        </button>
        <button onClick={() => { setGenre('Science Fiction'); setSearchData("") }} className={`btn btn-outline-dark me-2 ${genre === 'Science Fiction' && 'active'}`}>
          Science Fiction
        </button>
        <button onClick={() => { setGenre('Historical'); setSearchData("") }} className={`btn btn-outline-dark me-2 ${genre === 'Historical' && 'active'}`}>
          History
        </button>
      </div>

      {genre === 'All' && filteredProducts.length === 0 ? (
        <AllProducts />
      ) : (
        <div className="container" style={{ marginTop: '40px' }}>
          <div className="card-container">
            {filteredProducts.map(function (i) {
              return (
                <div className="card" key={i.id}>
                  <div className="img-title">
                    <img src={i.image_url} className="card-img-top" alt="book" />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{i.title}</h5>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">Author: {i.authors}</li>
                      <li className="list-group-item">Price: Rs. {i.num_pages}</li>
                    </ul>
                    <div className="buttons d-flex justify-content-between">
                      <a href="#" onClick={() => handleAddToCart(i)} className="card-link btn">
                        Add to Cart
                      </a>
                      <a href="#" onClick={() => navigate('/shoppingCart')} className="card-link btn">
                        Go to Cart
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        
        </div>
      )}
    </div>
  );
};

export default Home;