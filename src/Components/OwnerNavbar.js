
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/OwnerNavbar.css';

const OwnerNavbar = () => {
  return (
    <nav className="navbar">
     <div className="navbar-logo">
     <Link to="/">
          <img
            src="https://cdn-icons-png.freepik.com/256/15167/15167328.png?ga=GA1.1.455358885.1692768358&semt=ais_hybrid"
            alt="Bike Service Logo"
            className="logo-image"
          />
         </Link>
      </div>
      <div className="onavbar-logo-text">
        <p>Bike Fixers</p>
      </div>
      <ul className="navbar-links">
        
        <li>
          <Link to="/customer-booking">Bookings</Link>
        </li>
        
        <li>
        <Link to="/owner-services">Services</Link>
        </li>
        <li>
        <Link to="/owner-profile-details">Profile</Link>
        </li>
        
        <li>
          <Link to="/">Logout</Link>
        </li>
        
      </ul>
    </nav>
  );
};

export default OwnerNavbar;
