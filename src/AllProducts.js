import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTheData, addTheProducts } from "./redux.js";
import { useNavigate } from "react-router-dom";

function AllProducts() {
  let navigate = useNavigate();
  const productsArray = useSelector((state) => state.bookstore.productDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTheData());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addTheProducts(product));
  };

  const handleCardClick = (productId) => {
    navigate(`/book-details/${productId}`);
  };

  return (
    <div className='container' style={{ marginTop: '40px' }}>
      <div className="card-container">
        {productsArray.map((product) => (
          <div
            className="card"
            key={product.id}
            onClick={() => handleCardClick(product.id)}
          >
            <img src={product.image_url} className="card-img-top" alt="book" />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Author: {product.authors}</li>
                <li className="list-group-item">Price: Rs. {product.num_pages}</li>
              </ul>
              <div className="card-body d-flex justify-content-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click from triggering
                    handleAddToCart(product);
                  }}
                  className="btn btn-dark"
                >
                  Add to Cart
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click from triggering
                    navigate("/shoppingCart");
                  }}
                  className="btn btn-dark"
                >
                  Go to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
