import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import './home.css'; // Ensure this path is correct
import { fetchTheData, addTheProducts } from './redux.js';
import AllProducts from './AllProducts.js';
import NavLogin from './NavLogin.js';

const Home = () => {
  const [genre, setGenre] = useState('All');
  const [searchData, setSearchData] = useState('');
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const productsArray = useSelector((state) => state.bookstore.productDetails);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTheData());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(
      productsArray.filter((product) => {
        const titleIncludesSearch = product.title.toLowerCase().includes(searchData.toLowerCase());
        const genreMatches = genre === 'All' || product.genres.includes(genre);

        return titleIncludesSearch && genreMatches;
      })
    );
  }, [productsArray, searchData, genre]);

  const handleAddToCart = (product) => {
    dispatch(addTheProducts(product));
  };

  const handleSearch = (event) => {
    setSearchData(event.target.value);
  };

  return (
    <div>
      {user ? <Navbar /> : <NavLogin />}
      <div className="search-container">
        <div className="container">
          <h2 className="display-3 fw-bolder text-center mb-4">Find Your Book of Choice</h2>
          <div className="input-group mb-3 mx-auto w-50">
            <input
              onChange={handleSearch}
              value={searchData}
              type="text"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
              aria-describedby="button-addon2"
            />
            <button
              onClick={() => setSearchData('')}
              className="btn btn-outline-secondary bg-dark text-white"
              type="button"
              id="button-addon2"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      <div className="genre d-flex justify-content-center mb-5 pb-5">
        <button onClick={() => setGenre('All')} className={`btn btn-outline-dark me-2 ${genre === 'All' && 'active'}`}>
          All
        </button>
        <button onClick={() => setGenre('Romance')} className={`btn btn-outline-dark me-2 ${genre === 'Romance' && 'active'}`}>
          Romance
        </button>
        <button onClick={() => setGenre('Horror')} className={`btn btn-outline-dark me-2 ${genre === 'Horror' && 'active'}`}>
          Horror
        </button>
        <button onClick={() => setGenre('Fantasy')} className={`btn btn-outline-dark me-2 ${genre === 'Fantasy' && 'active'}`}>
          Fantasy
        </button>
        <button onClick={() => setGenre('Science Fiction')} className={`btn btn-outline-dark me-2 ${genre === 'Science Fiction' && 'active'}`}>
          Science Fiction
        </button>
        <button onClick={() => setGenre('Historical')} className={`btn btn-outline-dark me-2 ${genre === 'Historical' && 'active'}`}>
          History
        </button>
      </div>

      {genre === 'All' && filteredProducts.length === 0 ? (
        <AllProducts />
      ) : (
        <div className="container">
          <div className="card-container">
            {filteredProducts.map((product) => (
              <div className="card" key={product.id}>
                <div className="img-title">
                  <img src={product.image_url} className="card-img-top" alt="book" />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Author: {product.authors}</li>
                    <li className="list-group-item">Price: Rs. {product.num_pages}</li>
                  </ul>
                  <div className="buttons d-flex justify-content-between">
                    <button onClick={() => handleAddToCart(product)} className="btn btn-primary">
                      Add to Cart
                    </button>
                    <Link to="/shoppingCart" className="btn btn-outline-primary">
                      Go to Cart
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
