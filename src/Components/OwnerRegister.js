


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import OwnerNavbar from './OwnerNavbar';
import '../Styles/OwnerRegister.css';

const OwnerRegister = () => {
  const [shopName, setShopName] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState('');
  const [showAddService, setShowAddService] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  const handleAddService = () => {
    setShowAddService(true);
    setEditIndex(null);
    setNewService('');
  };
//function to handle save service
  const handleSaveService = () => {
    if (newService) {
      if (editIndex !== null) {
        const updatedServices = [...services];
        updatedServices[editIndex] = { serviceName: newService };
        setServices(updatedServices);
        setEditIndex(null);
      } else {
        setServices([...services, { serviceName: newService }]);
      }
      setNewService('');
      setShowAddService(false);
    }
  };
//function to handle edit
  const handleEditService = (index) => {
    setNewService(services[index].serviceName);
    setEditIndex(index);
    setShowAddService(true);
  };
//function to handle delete
  const handleDeleteService = (index) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    setServices(updatedServices);
  };

  const handleOwnerRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://bike-service-5q78.onrender.com/api/owner-register', {
        userId,
        shopName,
        address,
        location,
        services,
      });

      setMessage(response.data.message);
      if (response.data.message === 'Owner registered successfully!') {
        toast.success('Owner registered successfully!');
        setTimeout(() => {
          navigate('/owner-profile-details');
        }, 3000);
      }
    } catch (error) {
      console.error('Owner registration error:', error);
      setMessage('Owner registration failed. Please try again.');
      toast.error('Owner registration failed. Please try again.');
    }
  };

  return (
    <div>
      <OwnerNavbar />
      <div className="register-card">
        <h2>Owner Registration</h2>
        <form onSubmit={handleOwnerRegister}>
          <div className="form-group">
            <label>Bike Service Name:</label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              placeholder="Bike Service Name"
              required
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              required
            />
          </div>
          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              required
            />
          </div>
          <div className="form-group">
            <label>Services:</label>
            {services.map((service, index) => (
              <div key={index} className="service-item">
                <span>{service.serviceName}</span>
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => handleEditService(index)}
                  className="edit-icon"
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => handleDeleteService(index)}
                  className="delete-icon"
                />
              </div>
            ))}
            {showAddService ? (
              <div className="add-service-btn">
                <input
                  type="text"
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  placeholder="New Service Name"
                  required
                />
                <button style={{width:'200px',color:'white'}} type="button" onClick={handleSaveService}>
                  {editIndex !== null ? 'Update Service' : 'Save Service'}
                </button>
              </div>
            ) : (
              <button style={{width:'200px'}}type="button" onClick={handleAddService}>
                Add Service
              </button>
            )}
          </div>
          <div className="submit-btn">

            <button  style={{ padding: '12px 24px', width:'100px', fontSize: '16px', backgroundColor: 'black', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}type="submit">Register</button>
          </div>
        </form>
        {message && <p className="message">{message}</p>}
        <ToastContainer />
      </div>
    </div>
  );
};

export default OwnerRegister;
