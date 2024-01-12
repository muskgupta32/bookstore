import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware} from 'redux';
import * as thunk from 'redux-thunk';
import { rootReducer } from './redux';
import App from './App';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(rootReducer, applyMiddleware(thunk.thunk));


ReactDOM.render(
  
    <Provider store={store}>
      <App />
    </Provider>,
   document.getElementById('root')
);
