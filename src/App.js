import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 import BookingForm from './Components/BookingForm';

import Login from './Components/Login'; 
import Register from './Components/Register'; 
import OwnerRegister from './Components/OwnerRegister'; 
import CustomerView from './Components/CustomerView'; 
import Home from './Components/Home';
import OwnerBooking from './Components/OwnerBooking';
import CustomerBooking from './Components/CustomerBooking';
import OwnerProfileDetails from './Components/OwnerProfileDetails';
import OwnerServices from './Components/OwnerServices';
import CustomerDetails from './Components/CustomerDetails';
import Cards from './Components/Cards';
import OwnerDetails from './Components/OwnerDetails';
const App = () => {
  return (
    <Router>
     
      <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/booking-form" element={<BookingForm />} />
        
        <Route path="/customer-booking" element={<OwnerBooking/>} />
        <Route path="/customerbooking" element={<CustomerBooking/>} />
       
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/owner-register" element={<OwnerRegister />} />
        <Route path="/customer-view" element={<CustomerView />} />
        
        <Route path="/owner-profile-details" element={<OwnerProfileDetails />} />
        <Route path="/owner-services" element={<OwnerServices />} />
        <Route path="/customer-details" element={<CustomerDetails />} />
        <Route path="/Cards" element={<Cards />} />
        <Route path="/owner-details" element={<OwnerDetails />} />
        
      </Routes>
    </Router>
  );
};

export default App;
