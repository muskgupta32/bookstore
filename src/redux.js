import { combineReducers } from "redux";
import Axios from "axios";

export function fetchTheData() {
  return (dispatch) => {
    Axios.get("https://example-data.draftbit.com/books?_limit=20")
      .then(function (output) {
        dispatch({
          type: "FETCH_PRODUCTS",
          payload: output.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

const initialData = {
  productDetails: [],
};

export function addTheProducts(product) {
  return {
    type: "ADD_PRODUCTS",
    payload: product,
  };
}

export function deleteTheProducts(product) {
  return {
    type: "DELETE_PRODUCTS",
    payload: product,
  };
}
export const userCreator=(user)=>{
  return {
      type:"SET_USER",
      payload:user
  }
}

const bookstoreReducer = (state = initialData, action) => {
  if (action.type === "FETCH_PRODUCTS") {
    return {
      productDetails: action.payload,
    };
  }

  // Add a default case to handle other actions or return the current state
  return state;
};
const userReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    default:
      return state;
  }
};
const shoppingCartReducer = (state = { cartProducts: [] }, action) => {
  const product = action.payload;

  if (action.type === "ADD_PRODUCTS") {
    const existingProduct = state.cartProducts.find((x) => x.id === product.id);

    if (existingProduct) {
      return {
        ...state,
        cartProducts: state.cartProducts.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        ),
      };
    } else {
      return {
        ...state,
        cartProducts: [...state.cartProducts, { ...product, qty: 1 }],
      };
    }
  }

  if (action.type === "DELETE_PRODUCTS") {
    const existingProductToDelete = state.cartProducts.find(
      (x) => x.id === product.id
    );

    if (existingProductToDelete) {
      if (existingProductToDelete.qty === 1) {
       
        return {
          ...state,
          cartProducts : state.cartProducts.filter((x) => {
            if (x.id === existingProductToDelete.id) {
              console.log("working");
              return false;
            }
          }),
        };
      } else {
        return {
          ...state,
          cartProducts: state.cartProducts.map((x) =>
            x.id === product.id ? { ...x, qty: x.qty - 1 } : x
          ),
        };
      }
      
    }
  }

  // Return the current state for other actions
  return state;
};


export const rootReducer = combineReducers({
  bookstore: bookstoreReducer,
  shoppingCart: shoppingCartReducer,
  user:userReducer,
});

