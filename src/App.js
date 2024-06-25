import './App.css';
import Navbar from './Navbar.js';
import Home from './Home.js';
import ShoppingCart from './ShoppingCart.js';
import { BrowserRouter,  Route, Routes } from 'react-router-dom';
import Login from './Login.js'
import BookDetailsPage from './BookDetailsPage.js';
import SignUp from './SignUp.js';
function App() {
  return (
    <div className="App">
     
     <BrowserRouter>
        <Routes>
          <Route path="/shoppingCart" element={<ShoppingCart/>}/>
          <Route path="" element={<Home/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/bookstore/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>

           {/* dynamic routes */}
          <Route path="/book-details/:id" element={<BookDetailsPage/>}/>  
          <Route path="/signup" element={<SignUp/>}/>  
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
