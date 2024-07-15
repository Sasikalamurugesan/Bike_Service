import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../Styles/OwnerBooking.css'; 
import OwnerNavbar from './OwnerNavbar';

const CustomerBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [editingStatus, setEditingStatus] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);
// Function to fetch bookings from the server
  const fetchBookings = async () => {
    try {
      const userId = localStorage.getItem('userId'); 
      const response = await axios.get(`http://localhost:5000/api/bookings/${userId}`);

      const filteredBookings = response.data.filter(booking => booking.ownerId === userId);

      setBookings(filteredBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to fetch bookings. Please try again.');
    }
  };
// Function to update booking status
  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/bookings/${bookingId}/status`, { status: newStatus });
      if (response.data.success) {
        toast.success('Booking status updated successfully!');

       
        if (newStatus === 'Ready') {
          await axios.post(
            'http://localhost:5000/api/send-ready-email',
            { bookingId }
          );
        }
        // Fetch updated bookings data
        fetchBookings(); 
        // Reset editing status
        setEditingStatus(null);
        // Reset new status
        setNewStatus("");
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error('Failed to update booking status. Please try again.');
    }
  };

  return (
    <div>
      <OwnerNavbar />
      <div className="owner-booking">
        <h2>Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <table className="booking-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Vehicle Model</th>
                <th>Vehicle Number</th>
                <th>Services</th>
                <th>Status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, idx) => (
                <tr key={idx} className="booking-item">
                  <td>{new Date(booking.date).toLocaleDateString()}</td>
                  <td>{booking.customerName}</td>
                  <td>{booking.email}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.vehicleModel}</td>
                  <td>{booking.vehicleNumber}</td>
                  <td>{booking.services.join(', ')}</td>
                  <td>
                    {editingStatus === booking._id ? (
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                      >
                        <option value="">Select Status</option>
                        <option value="Ready">Ready</option>
                        <option value="completed">Completed</option>
                      </select>
                    ) : ( 
                      booking.status || 'pending'
                    )}
                  </td>
                  <td>
                    {editingStatus === booking._id ? (
                      <div>
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="save-icon"
                          onClick={() => updateBookingStatus(booking._id, newStatus)}
                        />
                        <FontAwesomeIcon
                          icon={faTimes}
                          className="cancel-icon"
                          onClick={() => setEditingStatus(null)}
                        />
                      </div>
                    ) : (
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="edit-icon"
                        onClick={() => {
                          setEditingStatus(booking._id);
                          setNewStatus(booking.status);
                        }}
                      />
                    )}
                  </td>
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
