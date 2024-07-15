
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import BookingForm from './BookingForm'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; 

const OwnerDetails = () => {
  const location = useLocation();
  const { owner } = location.state; 

  const [showBookingForm, setShowBookingForm] = useState(true); 
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {showBookingForm && <BookingForm owner={owner} />}
    </div>
  );
};

export default OwnerDetails;