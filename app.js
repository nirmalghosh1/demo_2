// Description: Entry point for the APIs
// Author: AshwinSathian

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/dev.json');

const userAuthRoutes = require('./routes/userAuth');
const bookingRoutes = require('./routes/booking');
const messageRoute = require('./routes/message');
const inventoryRoute = require('./routes/inventory');
const purchaseRoute = require('./routes/purchase');
const rentalRoute = require('./routes/rental');
const countRoute = require('./routes/galleryCount');
const paymentRoute = require('./routes/payment');
const cmsRoute = require('./routes/cms');
const forgotRoute = require('./routes/forgotPassword');

// const User = require('./models/user');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Database Connection
mongoose.connect(config.db.connString, { useNewUrlParser: true })
.then(() => {
  console.log('Database Connection Successful');
})
.catch((err) => {
  console.log('Database Connection Failed');
});

// mongoose.connect('mongodb://localhost:27017/eventManagement')
// .then(() => function() {
//   console.log('Database Connection Successful');
// })
// .catch((err) => function() {
//   console.log('Database Connection Failed');
// });

// User Authentication Route
app.use('/api/auth', userAuthRoutes);

// Contact Form Submit Route
app.use('/api/contact', messageRoute);

// Bookings Route
app.use('/api/booking', bookingRoutes);

// Inventory Route
app.use('/api/inventory', inventoryRoute);

// Purchase Route
app.use('/api/purchase', purchaseRoute);

// Rental Route
app.use('/api/rental', rentalRoute);

// Count Route
app.use('/api/galleryCount', countRoute);

// Payments Route
app.use('/api/payment', paymentRoute);

// CMS Route
app.use('/api/cms', cmsRoute);

// forgotPassword Route
app.use('/api/forgotPassword', forgotRoute);

// const server = app.listen(process.env.PORT || 3000, '10.0.0.86');
const server = app.listen(process.env.PORT || 3000);