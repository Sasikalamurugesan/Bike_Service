


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/CustomerDetails.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OwnerNavbar from './OwnerNavbar';

const OwnerProfileDetails = () => {
  const [ownerDetails, setOwnerDetails] = useState(null);

  useEffect(() => {
    fetchOwnerDetails();
  }, []);
//fetch owner details
  const fetchOwnerDetails = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found in localStorage');
      }
      const response = await axios.get('http://localhost:5000/api/get-owner-details', {
        headers: {
          userid: userId,
        },
      });
      setOwnerDetails(response.data);
    } catch (error) {
      console.error('Error fetching owner details:', error);
      toast.error('Failed to fetch owner details.');
    }
  };

  if (!ownerDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page-container">
      <OwnerNavbar />
      <div className="profile-card-container">
        <div className="customer-profile-card">
          <div className="profile-header">
            <img src='https://tse1.mm.bing.net/th?id=OIP.SxuyKL-Ca-_bXp1TC4c4-gHaF3&pid=Api&P=0&h=180' alt="Profile" className="profile-photo" />
            <h2>Owner Profile</h2>
          </div>
          <div className="profile-details">
            <p><strong>Shop Name:</strong> {ownerDetails.shopName}</p>
            <p><strong>Address:</strong> {ownerDetails.address}</p>
            <p><strong>Location:</strong> {ownerDetails.location}</p>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default OwnerProfileDetails;
