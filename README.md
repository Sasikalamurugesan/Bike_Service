# Bike Service Application

## Overview

The Bike service application  for owners of Bike service stations. It helps the owners to list all the services
they offer. Customers can choose one or more services to book and recieve an email when they book a service.

## TechStack

**Frontend**: React

**Backend**: Node.js (Express)

**Database**: MongoDB Atlas

**Others**: CSS for styling, React Router for navigation

## Modules
 - Owner Module
 
 - Customer Module

## Features

- **Bike Station Owners:**
- Should be able to create / edit / delete all his services and their details 
- View a list of all bookings ( pending, ready for delivery and completed) 
- View details of each booking
- Mark a booking as ready for delivery
- Mark a booking as completed
- Receive an email whenever a booking is made

- **Customers:**
  - Should be able to register for an account with his email address and mobile number -
    Book a service at a particular date
  - See the status of his booking
  - See all his previous bookings
  - Receive an email as soon as his booking is ready for delivery

## Project Structure
CARTRABBIT/

├── backend/

│   ├── .env

│   ├── server.js

│   └── node_modules/

│       └── ...

├── frontend/

│   ├── public/

│   │   └── ...

│   ├── src/

│   │   ├── Components

│   │   │   ├── BookingForm.js

│   │   │   ├── Cards.js

│   │   │   ├── CustomerBooking.js

│   │   │   ├── CustomerDetails.js

│   │   │   ├── CustomerNavbar.js

│   │   │   ├── CustomerView.js

│   │   │   ├── Home.js

│   │   │   ├── Login.js

│   │   │   ├── Navbar.js

│   │   │   ├── OwnerBooking.js

│   │   │   ├── OwnerDetails.js

│   │   │   ├── OwnerNavbar.js

│   │   │   ├── OwnerProfile.js

│   │   │   ├── OwnerProfileDetails.js

│   │   │   └── OwnerRegister.js


│   │   ├── App.js

│   │   ├── index.js

│   │   └── styles/

│   │       └── ...

│   ├── package.json

│   ├── package-lock.json

│   └── node_modules/

│       └── ...

├── README.md

└── .gitignore

## Installation

1. **Clone the repository**:

   https://github.com/Sasikalamurugesan/Bike_Service.git
   
2. **Navigate to the project directory**:
   
   cd Bike_Service
   
## Running the Application

## Frontend

1. **Install the dependencies:**
     npm install

     npm install react react-dom

     npm install axios

     npm install react-toastify

     npm install --save @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core


3. **Start the frontend development server**:
     npm start
4. **Access the frontend application**:
     Open your web browser and navigate to http://localhost:3000.

## Backend

1. **Navigate to the backend directory**:

   cd backend
   
2. **Install the dependencies:**

   npm install express

   npm install mongoose

   npm install cors

   npm install bcrypt

   npm install body-parser

   npm install nodemailer

   npm install dotenv

   npm install jsonwebtoken

 

   
4. **Start the backend server**:
    node Server.js
   
5. **Backend API**:
   
   The backend server will be running at http://localhost:5000 (or the port specified in your configuration).

## Database Schema Structure

**Users Schema**
const userSchema = new Schema({

  name: String,
  
  email: String,
  
  mobileNumber: String,
  
  password: String,
  
  role: String,
  
  shopName: String,
  
  address: String,
  
  location: String,
  
  services: [{
  
    type: mongoose.Schema.Types.ObjectId,
    
    ref: 'Service'
    
  }],
  
});

**Service Schema**

const serviceSchema = new Schema({

  userId: {
  
    type: mongoose.Schema.Types.ObjectId,
    
    ref: 'User',
    
    required: true
    
  },
  
  shopName: {
  
    type: String,

    required: true
    
  },
  
  address: {
  
    type: String,
    
    required: true
    
  },
  
  location: {
  
    type: String,
    
    required: true
    
  },
  
  serviceName: {
  
    type: String,
    
    required: true
    
  },
  
});

**Booking Schema**

const BookingSchema = new mongoose.Schema({

  date: {
  
    type: Date,
    
    required: true,
    
  },
  
  customerName: {
  
    type: String,

    required: true,
    
  },
  
  email: {
  
    type: String,
    
    required: true,
    
  },
  
  phone: {
  
    type: String,
    
    required: true,
    
  },
  vehicleModel: {
  
    type: String,
    
    required: true,
    
  },
  
  vehicleNumber: {
  
    type: String,
    
    required: true,
    
  },
  
  services: {
  
    type: [String],
    
    required: true,
    
  },
  
  status: {
  
    type: String,
    
    enum: ['pending', 'approved', 'completed'],
    
    default: 'pending',
    
  },
  
  ownerId: {
  
    type: mongoose.Schema.Types.ObjectId,
    
    ref: 'Owner',
    
    required: true,
    
  },
  
  customerId: {
  
     type: mongoose.Schema.Types.ObjectId,
     
      ref: 'User',
      
       required: true 
       
      },
      
});

## Sample Data

**User**

**Owner**

name: "sasikala"

email: "sasikalam.21it@kongu.edu"

mobileNumber: "9025621088"

password: "sasi"

role: "owner"

address: "Nehru's street ,vettavalam"

location: "Thiruvanamalai"

shopName:"Bikecare"

**Customer**

name: "Brindha"

email:"sasikalamurugesan19@gmail.com"

mobileNumber:"9488461201"

password:"brindha"

role:"customer"

**Services**

userId: 6694a7910b446b16dfd14c63

shopName: "Bikecare"

address: "Nehru's street ,vettavalam"

location: "Thiruvanamalai"

serviceName: "water wash"

**Bookings**

date: 2024-07-13T00:00:00.000+00:00

customerName: "Brindha"

email:"sasikalamurugesan19@gmail.com"

phone:"09488461201"

vehicleModel:"Honda"

vehicleNumber:"TN22EF2345"

status: "Ready"

ownerId:6694a7910b446b16dfd14c63

customerId:6694a8420b446b16dfd14c80

**Snapshots of Project**

![image](https://github.com/user-attachments/assets/436f4b07-83b5-496c-a67a-7e3e87b51d56)

![image](https://github.com/user-attachments/assets/4819e539-1deb-4a77-847d-66120323d8a7)

![image](https://github.com/user-attachments/assets/e2dc5a78-adf6-47b9-9c1a-d42149399995)

![image](https://github.com/user-attachments/assets/3adf27ee-4cec-44df-a27a-d305ef58db2e)

![image](https://github.com/user-attachments/assets/1c9c9503-932a-41ef-8e47-507faaa26556)

![image](https://github.com/user-attachments/assets/14d211cc-137f-45ac-b46a-92da8b9c427d)

![image](https://github.com/user-attachments/assets/a7085255-0b3e-4faf-9486-fa0968f74e39)

![image](https://github.com/user-attachments/assets/93bc1ee1-d4a0-47be-b698-039698d7f6c6)

![image](https://github.com/user-attachments/assets/d69ec949-1886-4803-8536-dc69aee9be1a)

![image](https://github.com/user-attachments/assets/12c3a856-4eb3-42ae-8be6-96a659c0b10e)

![image](https://github.com/user-attachments/assets/9e518b90-8438-450a-b36a-4c3cf606e779)

![image](https://github.com/user-attachments/assets/3227d4e9-51b4-45df-9fd3-23a2d46d6ea1)

![image](https://github.com/user-attachments/assets/74bf69b3-ed21-457f-8bc3-7051abed121c)


![image](https://github.com/user-attachments/assets/37567572-9028-4ada-8adf-3fdcd59f2b87)



 
   **Thank You**







   

   
   
   
   


   











