

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('customer'); // Default to customer
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
        userType, 
      });

      console.log('Response from server:', response.data);

      setMessage(response.data.message);

      if (response.data.message === 'Login successful!') {
        const { userId, role } = response.data;
        localStorage.setItem('userId', userId); 

        
        if (role === 'owner') {
          
          const userResponse = await axios.get(`http://localhost:5000/api/get-owner-details`, {
            headers: {
              'userId': userId
            }
          });

          if (userResponse.data.services.length === 0) {
            // Navigate to service registration form
            console.log('Navigating to service registration form');
            navigate('/owner-register');
          } else {
            
            console.log('Navigating to owner profile page');
            navigate('/owner-profile-details');
          }
        } else if (role === 'customer') {
          
          console.log('Navigating to service page for customers');
          navigate('/customer-view');
        }

        toast.success('Login successful!');
      } else {
        toast.error('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);

      if (error.response) {
        
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        
        console.error('Request data:', error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error message:', error.message);
      }

      setMessage('Login failed. Please try again.');
      toast.error('Login failed. Please try again.');
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <div className="input-container">
                <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                <input
                style={{width:'350px'}}
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-container">
                <FontAwesomeIcon icon={faLock} className="input-icon" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="userType">Login as:</label>
              <select
                id="userType"
                value={userType}
                style={{width:'350px',padding:'10px'}}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="customer">Customer</option>
                <option value="owner">Owner</option>
                
              </select>
            </div>
            <button type="submit">Login</button>
          </form>
          {message && <p>{message}</p>}
          <p className="signup-link">
            Don't have an account? <a href="/register">Sign up</a>
          </p>
        </div>
        <div className="login-right">
          <img src="https://scentswala.com/front-assets/img/main/others/login-side-img.png" alt="Login" />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
