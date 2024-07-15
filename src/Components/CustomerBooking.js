

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/CustomerBooking.css';
import CustomerNavbar from './CustomerNavbar';
const CustomerBooking = () => {
  const [bookings, setBookings] = useState([]);
//fetch booking details
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = localStorage.getItem('userId'); 
        console.log('User ID:', userId); 

        const response = await axios.get(`http://localhost:5000/api/customer/bookings/${userId}`);
        const filteredBookings = response.data.filter(booking => booking.customerId === userId);
        
       
        const bookingsWithStatus = filteredBookings.map(booking => ({
          ...booking,
          
        }));
        
        console.log('Filtered Bookings:', bookingsWithStatus); 
        setBookings(bookingsWithStatus);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        toast.error('Failed to fetch bookings. Please try again.');
      }
    };

    fetchBookings();
  }, []); 

  return (
    <div>
      <CustomerNavbar/>
   
    <div className="customer-booking">
      <h2>Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table className="booking-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Vehicle Model</th>
              <th>Vehicle Number</th>
              <th>Services</th>
              <th>Status</th> 
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, idx) => (
              <tr key={idx}>
                <td>{booking.customerName}</td>
                <td>{booking.email}</td>
                <td>{booking.phone}</td>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
                <td>{booking.vehicleModel}</td>
                <td>{booking.vehicleNumber}</td>
                <td>{booking.services.join(', ')}</td>
                <td>{booking.status}</td> 
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ToastContainer />
    </div>
    </div>
  );
};

export default CustomerBooking;
