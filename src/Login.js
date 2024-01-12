import React, { useState } from 'react';
import * as MyYup from 'yup';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { auth } from "./firebase";
import './Login.css';
import { Navigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { userCreator } from './redux';
import NavLogin from './NavLogin';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  let user = useSelector((state) => state.user);
  if(user)
  {
    console.log("user exists",user);
  }

  const validationData = MyYup.object({
    email: MyYup.string().email('Please enter a valid email').required('Email is required'),
    password: MyYup.string().min(5).max(20).required('Password is required'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      await validationData.validate({ email, password }, { abortEarly: false });

      // Your sign-in logic goes here
      console.log({ email, password });
      await auth.signInWithEmailAndPassword(email, password);
      dispatch(userCreator(true));
      navigate('/');
      
      // Reset form state
      setEmail('');
      setPassword('');
      setErrors({});
    } catch (validationErrors) {
      // Set form errors
      const errorsObject = {};
      validationErrors.inner.forEach((error) => {
        errorsObject[error.path] = error.message;
      });
      setErrors(errorsObject);
    }
  };

  return (
    <div>
       
        <NavLogin/>
      
     
      <section className="signup-container">
        <div className="signup-img-container">
          {/* Placeholder for image */}
          <img src="/assets/bg2.jpg" className="card-img" alt="background" height="1000px" />
        </div>
        <div className="signup-content-container">
          <div className="content-wrapper">
            <div className="main-card card">
              <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <br />
                  {errors.email && <h6>{errors.email}</h6>}
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <br />
                  {errors.password && <h6>{errors.password}</h6>}
                  <br />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
