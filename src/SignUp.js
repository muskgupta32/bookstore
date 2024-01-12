import React, { useState } from 'react';
import * as MyYup from 'yup';
import { useNavigate } from 'react-router-dom';
import { auth } from "./firebase";
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import './SignUp.css';
import NavLogin from './NavLogin';


function SignUp() {
  const navigate = useNavigate();
  ;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  let user = useSelector((state) => state.user);
  if(user)
  {
    console.log("user exists",user);
  }

  const validationData = MyYup.object({
    email: MyYup.string().email('Please enter a valid email').required('Email is required'),
    password: MyYup.string().min(5).max(20).required('Password is required'),
    confirmPassword: MyYup.string()
      .oneOf([MyYup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationData.validate(
        { email, password, confirmPassword },
        { abortEarly: false }
      );
      await auth.createUserWithEmailAndPassword(email, password);
      // Your sign-up logic goes here
      console.log({ email, password, confirmPassword });
     
      navigate('/');

      // Reset form state
      setEmail('');
      setPassword('');
      setConfirmPassword('');
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
      <NavLogin />
      <section className="signup-container">
        <div className="signup-img-container">
          {/* Placeholder for image */}
          <img src="/assets/bg2.jpg" className="card-img" alt="background" height="1000px" />
        </div>
        <div className="signup-content-container">
          <div className="content-wrapper">
            <div className="main-card card">
              <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
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
                <div className="mb-3">
                  <label htmlFor="exampleInputConfirmPassword1" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputConfirmPassword1"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <br />
                  {errors.confirmPassword && <h6>{errors.confirmPassword}</h6>}
                  <br />
                </div>
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
