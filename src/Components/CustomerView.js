

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/CustomerView.css';
import CustomerNavbar from './CustomerNavbar';
import BookingForm from './BookingForm';

const bikeServicePhotos = [
  'https://img.freepik.com/premium-vector/flat-design-illustration-man-repairing-motorcycle_207579-2221.jpg?ga=GA1.1.455358885.1692768358&semt=ais_user',
  'https://img.freepik.com/free-vector/people-moto-service-vertical-banners_1284-38137.jpg?ga=GA1.1.455358885.1692768358&semt=ais_user',
  'https://img.freepik.com/free-vector/flat-repair-motorcycle-composition-with-father-biker-his-son-garage_1284-19396.jpg?ga=GA1.1.455358885.1692768358&semt=ais_user',
  'https://img.freepik.com/premium-photo/motorcycle-repair-shop-bike-maintenance-motorcycle-mechanics-repair-services-bike-diagnostics-m_861161-23676.jpg?ga=GA1.1.455358885.1692768358&semt=ais_user'
];

const CustomerView = () => {
  const [customerId, setCustomerId] = useState('');
  const [ownersDetails, setOwnersDetails] = useState([]);
  const [expandedOwner, setExpandedOwner] = useState(null);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCustomerId = localStorage.getItem('userId');
    if (storedCustomerId) {
      setCustomerId(storedCustomerId);
    }
  }, []);
//fetch owner details
  useEffect(() => {
    const fetchOwnersDetails = async () => {
      try {
        const response = await axios.get('https://bike-service-5q78.onrender.com/api/get-all-owner-details');
        setOwnersDetails(response.data);
      } catch (error) {
        console.error('Error fetching owners details:', error);
        toast.error('Failed to fetch owners details. Please try again.');
      }
    };

    fetchOwnersDetails();
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
//shufflephotos form bikeservice photos
  const shuffledPhotos = shuffleArray([...bikeServicePhotos]);

  const filteredOwners = ownersDetails.filter(owner => owner.shopName && owner.address && owner.location && owner.services.length > 0);

  const handleViewDetailsClick = (owner) => {
    setExpandedOwner(owner === expandedOwner ? null : owner);
  };

  const handleBookingClick = (owner) => {
    setSelectedOwner(owner);
    navigate('/owner-details', { state: { owner, customerId } });
  };

  return (
    <div>
      <CustomerNavbar />
      <div className="customer-view">
        <h2>All Owners Details</h2>
        <div className="owners-list">
          {filteredOwners.map((owner, index) => (
            <div key={index} className="owner-card">
              <img src={shuffledPhotos[index % shuffledPhotos.length]} alt="Bike Service" className="bike-service-photo" />
              <div className="owner-details">
                <h3>{owner.shopName}</h3>
                <p><strong>Address:</strong> {owner.address}</p>
                <p><strong>Location:</strong> {owner.location}</p>
                {expandedOwner === owner && (
                  <div className="expanded-content">
                    <strong>Services:</strong>
                    <ul>
                      {owner.services.map((service, idx) => (
                        <li key={idx}>{service.serviceName}</li>
                      ))}
                    </ul>
                    <button
                   
                      className="cbook-now-button"
                      onClick={() => handleBookingClick(owner)}
                    >
                      Book Now
                    </button>
                  </div>
                )}
              </div>
              <button
                className="view-details-button"
                onClick={() => handleViewDetailsClick(owner)}
              >
                {expandedOwner === owner ? 'Hide Details' : 'View Details'}
              </button>
            </div>
          ))}
        </div>
        {selectedOwner && <BookingForm owner={selectedOwner} customerId={customerId} />}
        <ToastContainer />
      </div>
    </div>
  );
};

export default CustomerView;
 

