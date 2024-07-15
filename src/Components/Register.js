
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/Register.css'; 

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [gender, setGender] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
//function to handle register
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match. Please try again.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        name,
        email,
        mobileNumber,
        password,
        role,
        gender,
      });
      setMessage(response.data.message);
      if (response.data.message === 'User registered successfully!') {
        toast.success('User registered successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 3000); 
      }
    } catch (error) {
      console.error('Registration error:', error); 
      setMessage('Registration failed. Please try again.');
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="avatar">
          <img src="https://logodix.com/logo/1713924.png" alt="avatar" />
        </div>
        <h2></h2>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <input
              type="text"
              style={{width:'350px'}}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              style={{width:'350px'}}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Mobile Number"
              style={{width:'350px'}}
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              style={{width:'350px'}}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              style={{width:'350px'}}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <select
              value={role}
              style={{width:'350px'}}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="customer">Customer</option>
              <option value="owner">Owner</option>
            </select>
          </div>
          <div className="form-group">
            <select
              value={gender}
              style={{width:'350px'}}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button  style={{width:'350px'}}className="btnregister" type="submit">Register</button>
        </form>
        {message && <p>{message}</p>}
        <ToastContainer />
        <p>
          Back to <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
