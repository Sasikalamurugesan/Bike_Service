

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/CustomerDetails.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomerNavbar from './CustomerNavbar'; 

const CustomerDetails = () => {
  const [customerDetails, setCustomerDetails] = useState(null);

  useEffect(() => {
    fetchCustomerDetails();
  }, []);
//fetch customer details
  const fetchCustomerDetails = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found in localStorage');
      }
      const response = await axios.get('https://bike-service-5q78.onrender.com/api/get-customer-details', {
        headers: {
          userid: userId,
        },
      });
      setCustomerDetails(response.data);
    } catch (error) {
      console.error('Error fetching owner details:', error);
      toast.error('Failed to fetch owner details.');
    }
  };

  if (!customerDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CustomerNavbar />
      <div className="customer-profile-card">
        
        <img src='https://tse1.mm.bing.net/th?id=OIP.SxuyKL-Ca-_bXp1TC4c4-gHaF3&pid=Api&P=0&h=180' alt="Profile" className="profile-photo" />
        <div className="profile-details">
          <p><strong>Name:</strong> {customerDetails.name}</p>
          <p><strong>Email:</strong> {customerDetails.email}</p>
          <p><strong>Phone:</strong> {customerDetails.mobileNumber}</p>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CustomerDetails;
