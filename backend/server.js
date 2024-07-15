//Required Packages and configuration
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const app = express();
require('dotenv').config();
const nodemailer = require('nodemailer');
//Middleware Setup
app.use(bodyParser.json());
app.use(cors());
//Connecting to MongoDB
mongoose.connect('mongodb+srv://sasikalam21it:Gd4CeQAoYntoLIBi@cluster0.2tw6imi.mongodb.net/Bikeservice', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));
//User Schema and Model
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
const User = mongoose.model('User', userSchema);
//Routes to login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ message: 'Login successful!', userId: user._id, role: user.role, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});
//Routes to register
app.post('/api/register', async (req, res) => {
  const { name, email, mobileNumber, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      mobileNumber,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
});

//Service schema and model
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
const Service = mongoose.model('Service', serviceSchema);

//Routes to owner register
app.post('/api/owner-register', async (req, res) => {
  const { userId, shopName, address, location, services } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const servicesArray = await Promise.all(
      services.map(async (service) => {
        const newService = new Service({
          userId,
          shopName,
          address,
          location,
          serviceName: service.serviceName,
        });
        await newService.save();
        return newService._id;
      })
    );

    user.shopName = shopName;
    user.address = address;
    user.location = location;
    user.services = servicesArray;

    await user.save();

    res.json({ message: 'Owner registered successfully!' });
  } catch (error) {
    console.error('Owner registration error:', error);
    res.status(500).json({ message: 'Owner registration failed. Please try again.' });
  }
});
//Routes to get owner details
app.get('/api/get-owner-details', async (req, res) => {
  try {
    const userId = req.headers['userid'];
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    const owner = await User.findById(userId).populate('services');
    if (!owner) {
      return res.status(404).json({ error: 'Owner not found' });
    }
    res.json(owner);
  } catch (error) {
    console.error('Error fetching owner details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//Roures to update owner details
app.put('/api/update-owner/:id', async (req, res) => {
  try {
    const ownerId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(ownerId)) {
      return res.status(400).json({ error: 'Invalid owner ID' });
    }
    const updatedOwner = req.body;
    const owner = await User.findByIdAndUpdate(ownerId, updatedOwner, { new: true }).populate('services');
    if (!owner) {
      return res.status(404).json({ error: 'Owner not found' });
    }
    res.json(owner);
  } catch (error) {
    console.error('Error updating owner:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//Routes to delete services
app.delete('/api/delete-service/:serviceId', async (req, res) => {
  const { serviceId } = req.params;

  try {
    const deletedService = await Service.findByIdAndDelete(serviceId);

    if (!deletedService) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'Failed to delete service. Please try again.' });
  }
});
//Routes to get all owner details
app.get('/api/get-all-owner-details', async (req, res) => {
  try {
    const users = await User.find().populate('services');
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No owners found.' });
    }

    const ownersDetails = users.map(user => ({
      userId: user._id,
      shopName: user.shopName,
      address: user.address,
      location: user.location,
      services: user.services.map(service => ({ serviceName: service.serviceName })),
    }));

    res.json(ownersDetails);
  } catch (error) {
    console.error('Error fetching owners details:', error);
    res.status(500).json({ message: 'Failed to fetch owners details.' });
  }
});
//Booking schema and model
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

const Booking = mongoose.model('Booking', BookingSchema);
//Route to booking
const updateBookingStatus = async (req, res) => {
  const { bookingId } = req.params;
  const { status } = req.body;

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.json({ success: true, data: updatedBooking });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
const router = express.Router();
router.put('/:bookingId/status', updateBookingStatus);
app.use('/api/bookings', router);
//setup nodemailer transporter

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'bikeservicecustomer@gmail.com',
    pass: 'tbur oggx srzs qgzh',
  },
  logger: true,
  debug: true,
});

//routes to send booking mail
const sendBookingConfirmationToCustomer = (to, bookingDetails) => {
  const mailOptions = {
    from: 'bikeservicecustomer@gmail.com',
    to: to,
    subject: 'Booking Confirmation',
    text: `Dear ${bookingDetails.customerName},\n\nYour booking has been confirmed.\n\nDetails:\nDate: ${bookingDetails.date}\nVehicle Model: ${bookingDetails.vehicleModel}\nVehicle Number: ${bookingDetails.vehicleNumber}\nServices: ${bookingDetails.services.join(', ')}\n\nThank you for choosing our service!\n\nBest regards,\nCustomer Service Team`,
  };

  return transporter.sendMail(mailOptions);
};
//routes to send mail to owner
const sendBookingNotificationToOwner = (to, bookingDetails) => {
  const mailOptions = {
    from: 'bikeservicecustomer@gmail.com',
    to: to,
    subject: 'New Booking Received',
    text: `Dear Owner,\n\nYou have a new booking.\n\nDetails:\nCustomer Name: ${bookingDetails.customerName}\nDate: ${bookingDetails.date}\nVehicle Model: ${bookingDetails.vehicleModel}\nVehicle Number: ${bookingDetails.vehicleNumber}\nServices: ${bookingDetails.services.join(', ')}\n\nBest regards,\nCustomer Service Team`,
  };

  return transporter.sendMail(mailOptions);
};

//Routes to book service

app.post('/api/book-service', async (req, res) => {
  try {
    
       
    const { customerId, ownerId, ...bookingDetails } = req.body;

    const booking = new Booking({ customerId, ownerId, ...bookingDetails });
    await booking.save();

   
    console.log('Customer ID:', customerId);

    
    const customer = await User.findById(customerId);
    if (!customer) {
      return res.status(404).send('Customer not found');
    }

    
    const owner = await User.findById(ownerId);
    if (!owner) {
      return res.status(404).send('Owner not found');
    }

    
    await sendBookingConfirmationToCustomer(customer.email, bookingDetails);

    
    await sendBookingNotificationToOwner(owner.email, bookingDetails);

    res.status(200).send('Booking successful and emails sent');
  } catch (error) {
    console.error('Error booking service:', error);
    res.status(500).send('Failed to book service');
  }
});

//Routes to  customer detais
app.get('/api/get-customer-details', async (req, res) => {
  try {
    const userId = req.headers['userid'];
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    const customer = await User.findById(userId).populate('services');
    if (!customer) {
      return res.status(404).json({ error: 'Owner not found' });
    }
    res.json(customer);
  } catch (error) {
    console.error('Error fetching owner details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//Routes to fetch booking
app.get('/api/bookings/:ownerId', async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const bookings = await Booking.find({ ownerId }).exec();
    res.status(200).json(bookings);
  } catch (error) {
    console.log('Error fetching bookings:', error);
    res.status(500).json({ message: 'Failed to fetch bookings. Please try again.' });
  }
});
//Routes to fetch customer booking
app.get('/api/customer/bookings/:customerId', async (req, res) => {
  try {

    const customerId = req.params.customerId;
    
    const bookings = await Booking.find({ customerId }).exec();
    
    console.log(bookings)
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Failed to fetch bookings. Please try again.' });
  }
});
//Routes to booking status
app.put('/api/bookings/:bookingId/status', async (req, res) => {
  const { bookingId } = req.params;
  const { status } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ success: false, message: 'Invalid booking ID' });
    }

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    if (status === 'Ready') {
      const emailText = `Dear ${booking.customerName}, your bike is ready for delivery.`;
      await transporter.sendMail({
        from: 'bikeservicecustomer@gmail.com',
        to: booking.customerEmail, 
        subject: 'Bike Ready for Delivery',
        text: emailText,
      });
    }

    res.json({ success: true, booking });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ success: false, message: 'Failed to update booking status' });
  }
});

//Routes to ready email
app.post('/api/send-ready-email', async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ success: false, message: 'Invalid booking ID' });
    }

    const booking = await Booking.findById(bookingId).populate('customerId'); 

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    
    const emailText = `Dear ${booking.customerName}, your bike is ready for delivery.`;
    await transporter.sendMail({
      from: 'bikeservicecustomer@gmail.com',
      to: booking.customerId.email, 
      subject: 'Bike Ready for Delivery',
      text: emailText,
    });

    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending ready email:', error);
    res.status(500).send('Failed to send email');
  }
});


app.get('/api/customer/bookings/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.params.userId }).populate('customerId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
