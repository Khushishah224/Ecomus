// Popup Component
import React, { useState, useEffect, useRef } from 'react';
import { toast, Toaster } from 'react-hot-toast'; // Importing toast and Toaster
import api from "../../api.js"

const Popup = ({ show, onClose }) => {
    const [currentForm, setCurrentForm] = useState('register');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
      fname: '',
      lname: '',
      email: '',
      password: '',
    });
  
    const [loginData, setLoginData] = useState({
      email: '',
      password: '',
    });
  
    // Handle input changes for both forms
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleLoginChange = (e) => {
      const { name, value } = e.target;
      setLoginData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    // Handle registration form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await api.post('/api/users/register', formData);
        console.log(response);
  
        const { token } = response.data;
        console.log(token)
        if (token) {
          localStorage.setItem('jwtToken', token);
        }
        else{
          console.log("token is not stored")
        }
  
        toast.success('Registration successful!'); // Using toast for success message
        setCurrentForm('login');
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || 'An error occurred. Please try again.'); // Using toast for error message
      }
    };
  
    // Handle login form submission
    const handleLoginSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await api.post('/api/users/login', loginData); // Your backend login endpoint
        console.log(response);
  
        const { token } = response.data;
        console.log(token)
        if (token) {
          localStorage.setItem('jwtToken', token);
        }
  
        toast.success('Login successful!'); // Using toast for success message
        onClose(); // Close the popup after successful login
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || 'Invalid credentials. Please try again.'); // Using toast for error message
      }
    };
  
    const renderForm = () => {
      switch (currentForm) {
        case 'register':
          return (
            <>
              <h3 className="mb-3">Register</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="fname"
                  placeholder="First name"
                  className="popup-input"
                  value={formData.fname}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="lname"
                  placeholder="Last name"
                  className="popup-input"
                  value={formData.lname}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  className="popup-input"
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password *"
                  className="popup-input"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className='d-flex justify-content-between'>
               
                  <button type="submit" className="popup-submit-button">Register</button>
                
           
                  <p className="text-div text-decoration-underline fw-semibold mt-3 pt-1">
                    Already have an account?{' '}
                    <a href="#login" className="text-black" onClick={() => setCurrentForm('login')}>
                      Login here
                    </a>.
                  </p>
                </div>
              </form>
            </>
          );
        case 'login':
          return (
            <>
              <h3 className="mb-3">Log in</h3>
              <form onSubmit={handleLoginSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  className="popup-input"
                  value={loginData.email}
                  onChange={handleLoginChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password *"
                  className="popup-input"
                  value={loginData.password}
                  onChange={handleLoginChange}
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <p className="mt-2" style={{ marginBottom: '0.5rem' }}>
                  <a href="#forgot-password" className="text-black" onClick={() => setCurrentForm('forgotPassword')}>
                    Forgot your password?
                  </a>
                </p>
                <div className="form-content d-flex justify-content-between">
                  <button type="submit" className="popup-submit-button">Login</button>
                  <div className="text-div text-decoration-underline fw-semibold mt-3 pt-1">
                    <p>
                      Don’t have an account?{' '}
                      <a href="#register" className="text-black" onClick={() => setCurrentForm('register')}>
                        Register now
                      </a>.
                    </p>
                  </div>
                </div>
              </form>
            </>
          );
        case 'forgotPassword':
          return (
            <>
              <h3 className="mb-3">Reset Your Password</h3>
              <p>Sign up for early Sale access plus tailored new arrivals, trends, and promotions.</p>
              <form>
                <input type="email" placeholder="Enter your email *" className="popup-input" />
                <p>
                  <a href="#login" className="text-black" onClick={() => setCurrentForm('login')}>Cancel</a>
                </p>
                <button type="submit" className="popup-reset-button">
                  Reset Password
                </button>
              </form>
            </>
          );
        default:
          return null;
      }
    };
  
    if (!show) return null;
  
    return (
      <div className="popup-overlay">
        <div className="popup-container">
          <button className="popup-close-button" onClick={onClose}>&times;</button>
          {renderForm()}
          <Toaster /> {/* Render the Toaster component here */}
        </div>
      </div>
    );
  };
  export default Popup;