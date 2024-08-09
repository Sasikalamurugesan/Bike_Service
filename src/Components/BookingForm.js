// //import statements
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import '../Styles/BookingForm.css';
// //initializing component
// const BookingForm = ({ owner }) => {
//   const customerId = localStorage.getItem('userId');
  
   

//   const [formData, setFormData] = useState({
//     customerName: '', 
//     email: '', 
//     phone: '', 
//     services: [],
//     date: '',
//     vehicleModel: '',
//     vehicleNumber: '',
//     ownerId: owner.userId, 
//     customerId: customerId, 
//   });
  
// //Fetch customer details
//   useEffect(() => {
    
     

//     const fetchCustomerDetails = async () => {
//       try {
      
//         const response = await axios.get(`http://localhost:5000/api/customers/${customerId}`);
       
//         const { customerName, email, phone } = response.data;
//         setFormData((prevFormData) => ({
//           ...prevFormData,
//           customerName,
//           email,
//           phone,
//         }));
//       } catch (error) {
//         console.error('Error fetching customer details:', error);
//       }
//     };

//     fetchCustomerDetails();
//   }, [customerId]);
// // Handling Input Changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
// //Handling checkbox changes
//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     if (checked) {
//       setFormData({ ...formData, services: [...formData.services, name] });
//     } else {
//       setFormData({
//         ...formData,
//         services: formData.services.filter((service) => service !== name),
//       });
//     }
//   };

  
// //Handling Form Submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
      
      
//       console.log('Form Data:', formData); 
  
      
//       const response = await axios.post('http://localhost:5000/api/book-service', formData);
      
      
//       console.log('Response:', response.data);
  
      
//       toast.success('Service booked successfully!');
  
      
//       setFormData({
//         customerName: '',
//         email: '',
//         phone: '',
//         services: [],
//         date: '',
//         vehicleModel: '',
//         vehicleNumber: '',
//         ownerId: owner.userId,
//         customerId: customerId,
//       });
//     } catch (error) {
      
//       console.error('Error booking service:', error);
  
      
//       toast.error('Failed to book service. Please try again.');
//     }
//   };
  
  
//   console.log('Owner services:', owner.services); 
  
  
//   console.log('Owner ID:', owner.userId);
//   console.log('Customer ID:', customerId);
  
// //Rendering the Form
//   return (
//     <div className="booking-form-card">
//       <div className="booking-form">
//         <h2>Book a Service at {owner.shopName}</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="customerName">Customer Name:</label>
//             <input
//               type="text"
//               id="customerName"
//               name="customerName"
//               placeholder='Name'
//               value={formData.customerName}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder='Email'
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="phone">Phone:</label>
//             <input
//               type="text"
//               id="phone"
//               name="phone"
//               placeholder='Mobile Number'
//               value={formData.phone}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="date">Date:</label>
//             <input
//               type="date"
//               id="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="vehicleModel">Vehicle Model:</label>
//             <input
//               type="text"
//               id="vehicleModel"
//               name="vehicleModel"
//               placeholder='vehicleModel'
//               value={formData.vehicleModel}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="vehicleNumber">Vehicle Number:</label>
//             <input
//               type="text"
//               id="vehicleNumber"
//               name="vehicleNumber"
//               placeholder='vehicleNumber'
//               value={formData.vehicleNumber}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Services:</label>
//             <div className="bcheckbox-group">
//               {owner.services && owner.services.length > 0 ? (
//                 owner.services.map((service, idx) => (
//                   <div key={idx} className="bcheckbox-item">
//                     <input
//                       type="checkbox"
//                       id={service.serviceName}
//                       name={service.serviceName}
//                       checked={formData.services.includes(service.serviceName)}
//                       onChange={handleCheckboxChange}
//                     />
//                     <h4>{service.serviceName}</h4>
//                   </div>
//                 ))
//               ) : (
//                 <p>No services available.</p>
//               )}
//             </div>
//           </div>
//           <button type="submit">Book Service</button>
//         </form>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default BookingForm;





// // import statements
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import '../Styles/BookingForm.css';

// // initializing component
// const BookingForm = ({ owner }) => {
//   const customerId = localStorage.getItem('userId');

//   const [formData, setFormData] = useState({
//     customerName: '',
//     email: '',
//     phone: '',
//     services: [],
//     date: '',
//     vehicleModel: '',
//     vehicleNumber: '',
//     ownerId: owner.userId,
//     customerId: customerId,
//   });

//   // Fetch customer details
//   useEffect(() => {
//     const fetchCustomerDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/customers/${customerId}`);
//         const { customerName, email, phone } = response.data;
//         setFormData((prevFormData) => ({
//           ...prevFormData,
//           customerName,
//           email,
//           phone,
//         }));
//       } catch (error) {
//         console.error('Error fetching customer details:', error);
//       }
//     };

//     fetchCustomerDetails();
//   }, [customerId]);

//   // Handling Input Changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handling checkbox changes
//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     if (checked) {
//       setFormData({ ...formData, services: [...formData.services, name] });
//     } else {
//       setFormData({
//         ...formData,
//         services: formData.services.filter((service) => service !== name),
//       });
//     }
//   };

//   // Handling Form Submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log('Form Data:', formData);

//       const response = await axios.post('http://localhost:5000/api/book-service', formData);
//       console.log('Response:', response.data);

//       toast.success('Service booked successfully!');

//       setFormData({
//         customerName: '',
//         email: '',
//         phone: '',
//         services: [],
//         date: '',
//         vehicleModel: '',
//         vehicleNumber: '',
//         ownerId: owner.userId,
//         customerId: customerId,
//       });
//     } catch (error) {
//       console.error('Error booking service:', error);
//       toast.error('Failed to book service. Please try again.');
//     }
//   };

//   console.log('Owner services:', owner.services);
//   console.log('Owner ID:', owner.userId);
//   console.log('Customer ID:', customerId);

//   // Rendering the Form
//   return (
//     <div className="booking-form-card">
//       <div className="booking-form">
//         <h2>Book a Service at {owner.shopName}</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="customerName">Customer Name:</label>
//             <input
//               type="text"
//               id="customerName"
//               name="customerName"
//               placeholder="Name"
//               value={formData.customerName}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="phone">Phone:</label>
//             <input
//               type="text"
//               id="phone"
//               name="phone"
//               placeholder="Mobile Number"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="date">Date:</label>
//             <input
//               type="date"
//               id="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="vehicleModel">Vehicle Model:</label>
//             <input
//               type="text"
//               id="vehicleModel"
//               name="vehicleModel"
//               placeholder="Vehicle Model"
//               value={formData.vehicleModel}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="vehicleNumber">Vehicle Number:</label>
//             <input
//               type="text"
//               id="vehicleNumber"
//               name="vehicleNumber"
//               placeholder="Vehicle Number"
//               value={formData.vehicleNumber}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Services:</label>
//             <div className="bcheckbox-group">
//               {owner.services && owner.services.length > 0 ? (
//                 owner.services.map((service, idx) => (
//                   <div key={idx} className="bcheckbox-item">
//                     <input
//                       type="checkbox"
//                       id={service.serviceName}
//                       name={service.serviceName}
//                       checked={formData.services.includes(service.serviceName)}
//                       onChange={handleCheckboxChange}
//                     />
//                     {/* <label htmlFor={service.serviceName}>{service.serviceName}</label> */}
//                     <h5>{service.serviceName}</h5>
//                   </div>
//                 ))
//               ) : (
//                 <p>No services available.</p>
//               )}
//             </div>
//           </div>
//           <button type="submit">Book Service</button>
//         </form>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default BookingForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/BookingForm.css';

// initializing component
const BookingForm = ({ owner }) => {
  const customerId = localStorage.getItem('userId');

  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    services: [],
    date: '',
    vehicleModel: '',
    vehicleNumber: '',
    ownerId: owner.userId,
    customerId: customerId,
  });

  // Fetch customer details
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(`https://bike-service-5q78.onrender.com/api/customers/${customerId}`);
        const { customerName, email, phone } = response.data;
        setFormData((prevFormData) => ({
          ...prevFormData,

          customerName,
          email,
          phone,
        }));
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };

    fetchCustomerDetails();
  }, [customerId]);

  // Handling Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handling checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, services: [...formData.services, name] });
    } else {
      setFormData({
        ...formData,
        services: formData.services.filter((service) => service !== name),
      });
    }
  };

  // Handling Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if the date is in the future
    const today = new Date().toISOString().split('T')[0];
    if (formData.date < today) {
      toast.error('The selected date must be in the future.');
      return;
    }

    try {
      console.log('Form Data:', formData);

      const response = await axios.post('https://bike-service-5q78.onrender.com/api/book-service', formData);
      console.log('Response:', response.data);

      toast.success('Service booked successfully!');

      setFormData({
        customerName: '',
        email: '',
        phone: '',
        services: [],
        date: '',
        vehicleModel: '',
        vehicleNumber: '',
        ownerId: owner.userId,
        customerId: customerId,
      });
    } catch (error) {
      console.error('Error booking service:', error);
      toast.error('Failed to book service. Please try again.');
    }
  };

  console.log('Owner services:', owner.services);
  console.log('Owner ID:', owner.userId);
  console.log('Customer ID:', customerId);

  // Rendering the Form
  return (
    <div className="booking-form-card">
      <div className="booking-form">
        <h2>Book a Service at {owner.shopName}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="customerName">Customer Name:</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              placeholder="Name"
              value={formData.customerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Mobile Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]} 
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="vehicleModel">Vehicle Model:</label>
            <input
              type="text"
              id="vehicleModel"
              name="vehicleModel"
              placeholder="Vehicle Model"
              value={formData.vehicleModel}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="vehicleNumber">Vehicle Number:</label>
            <input
              type="text"
              id="vehicleNumber"
              name="vehicleNumber"
              placeholder="Vehicle Number"
              value={formData.vehicleNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Services:</label>
            <div className="bcheckbox-group">
              {owner.services && owner.services.length > 0 ? (
                owner.services.map((service, idx) => (
                  <div key={idx} className="bcheckbox-item">
                    <input
                      type="checkbox"
                      id={service.serviceName}
                      name={service.serviceName}
                      checked={formData.services.includes(service.serviceName)}
                      onChange={handleCheckboxChange}
                    />
                    <h5>{service.serviceName}</h5>
                  </div>
                ))
              ) : (
                <p>No services available.</p>
              )}
            </div>
          </div>
          <button type="submit">Book Service</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookingForm;
