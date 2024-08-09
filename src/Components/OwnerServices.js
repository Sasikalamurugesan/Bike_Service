import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTimes, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/OwnerServices.css'; 
import OwnerNavbar from './OwnerNavbar';

const OwnerServices = () => {
  const [services, setServices] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [updatedServices, setUpdatedServices] = useState([]);
  const [editingServiceIndex, setEditingServiceIndex] = useState(null);
  const [newService, setNewService] = useState("");
  const [addingService, setAddingService] = useState(false);

  useEffect(() => {
    fetchOwnerServices();
  }, []);

  const fetchOwnerServices = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found in localStorage');
      }
      const response = await axios.get('https://bike-service-5q78.onrender.com/api/get-owner-details', {
        headers: {
          userid: userId,
        },
      });
      setServices(response.data.services);
      setUpdatedServices(response.data.services); 
    } catch (error) {
      console.error('Error fetching owner services:', error);
      toast.error('Failed to fetch owner services.');
    }
  };

  const handleEditService = (index) => {
    setEditingServiceIndex(index);
    setEditMode(true);
  };
// function to handle save service
  const handleSaveService = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found in localStorage');
      }
      await axios.put(`https://bike-service-5q78.onrender.com/api/update-owner/${userId}`, { services: updatedServices });
      toast.success('Services updated successfully.');
      setEditMode(false);
      setEditingServiceIndex(null);
      setAddingService(false);
      setServices(updatedServices);
    } catch (error) {
      console.error('Error updating services:', error.response ? error.response.data : error);
      toast.error('Failed to update services. Please try again.');
    }
  };
  
  
  //function to handle cancel
  const handleCancelService = () => {
    setEditMode(false);
    setAddingService(false);
    setUpdatedServices([...services]);
    setEditingServiceIndex(null);
  };

  const handleServiceInputChange = (e, index) => {
    const { name, value } = e.target;
    const updated = [...updatedServices];
    updated[index] = { ...updated[index], [name]: value };
    setUpdatedServices(updated);
  };

  const handleDeleteService = async (index) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found in localStorage');
      }
      const updated = updatedServices.filter((_, i) => i !== index);
      await axios.put(`https://bike-service-5q78.onrender.com/api/update-owner/${userId}`, { services: updated });
      toast.success('Service deleted successfully.');
      setServices(updated);
      setUpdatedServices(updated);
    } catch (error) {
      console.error('Error deleting service:', error.response ? error.response.data : error);
      toast.error('Failed to delete service. Please try again.');
    }
  };

  const handleAddService = () => {
    setAddingService(true);
    setNewService("");
  };

  const handleNewServiceChange = (e) => {
    setNewService(e.target.value);
  };

  const handleSaveNewService = () => {
    setUpdatedServices([...updatedServices, { serviceName: newService }]);
    setAddingService(false);
    setNewService("");
    handleSaveService();
  };

  if (!updatedServices) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <OwnerNavbar />
      <div className="owner-services">
        <h3>Services</h3>
        <div className="services-list">
          {updatedServices.map((service, index) => (
            <div key={index} className="service-card">
              {editMode && editingServiceIndex === index ? (
                <>
                  <input
                    type="text"
                    name="serviceName"
                    value={service.serviceName}
                    onChange={(e) => handleServiceInputChange(e, index)}
                  />
                  <button className="icon-button save-button" onClick={handleSaveService}>
                    <FontAwesomeIcon icon={faSave} />
                  </button>
                  <button className="icon-button cancel-button" onClick={handleCancelService}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </>
              ) : (
                <>
                  <p>{service.serviceName}</p>
                  <button className="icon-button edit-button" onClick={() => handleEditService(index)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="icon-button delete-button" onClick={() => handleDeleteService(index)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="add-service">
          {addingService ? (
            <>
              <input
                type="text"
                placeholder="New Service"
                value={newService}
                onChange={handleNewServiceChange}
              />
              <button className="icon-button save-button" onClick={handleSaveNewService}>
                <FontAwesomeIcon icon={faSave} />
              </button>
              <button className="icon-button cancel-button" onClick={handleCancelService}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </>
          ) : (
            <button className="icon-button add-button" onClick={handleAddService}>
              <FontAwesomeIcon icon={faPlus} />
              <span style={{ marginLeft: '5px' }}>Add Service</span>
            </button>
          )}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default OwnerServices;


