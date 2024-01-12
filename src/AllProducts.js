import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTheData, addTheProducts } from "./redux.js";
import { useNavigate } from "react-router-dom";

function AllProducts() {
  let navigate = useNavigate();
  const productsArray = useSelector(function (output) {
    return output.bookstore.productDetails;
  });

  const dispatch = useDispatch();

  function getTheData() {
    dispatch(fetchTheData());
  }

  useEffect(() => {
    getTheData();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addTheProducts(product));
  };

  return (
    <div className='container' style={{ marginTop: '40px' }}>
      <div className="card-container">
        {productsArray.map(function (product) {
          return (
            <div className="card" key={product.id} onClick={(event) => {
              // Check if the clicked element or its ancestors have the class "card-link" or "btn"
              if (!event.target.closest(".card-link") && !event.target.closest(".btn")) {
                // Execute the navigation only if the clicked element or its ancestors do not have the specified classes
                console.log("event.target.classList", event.target.classList);
                navigate(`/book-details/${product.id}`);
              }
            }}>
              <img src={product.image_url} className="card-img-top" alt="book" />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Author: {product.authors}</li>
                <li className="list-group-item">Price: Rs. {product.num_pages}</li>
              </ul>
              <div className="card-body">
                <a href="#" onClick={() => handleAddToCart(product)} className="card-link btn">Add to Cart</a>
                <a href="#" onClick={() => navigate("/shoppingCart")} className="card-link btn">Go to Cart</a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllProducts;
