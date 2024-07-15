import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom for navigation
import '../Styles/Home.css';
import Navbar from './Navbar'; 
import Cards from './Cards';

const Home = () => {
  // Initialize useNavigate hook
  const navigate = useNavigate(); 

  const handleBookNow = () => {
    // Navigate to '/login' route when clicking on "Book Now"
    navigate('/login'); 
  };

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <div className="background-image">
          <div className="quote-container">
            <h2>
              "The best way to take care of your bike, <br/>
              is to book your services regularly with us!"
            </h2>
            <button style={{width:'150px',backgroundColor:'#987070'}}  onClick={handleBookNow}>
              Book Now
            </button>
          </div>
        </div>
      </div>
      <Cards />
    </div>
  );
};

export default Home;
