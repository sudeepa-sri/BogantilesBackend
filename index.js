
const express = require('express');
const session = require('express-session'); // Import express-session
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Define CORS options first
const corsOptions = {
  origin: 'http://localhost:5173',  // Your frontend URL
};

// Use CORS middleware with the defined options
app.use(cors(corsOptions));

app.use(express.json());
// Before serving static files, apply CORS middleware for the uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Middlewares
app.use(session({
  secret: process.env.SESSION_SECRET, // We'll put SESSION_SECRET in .env
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set true if using HTTPS
}));

// Routes
const authRoutes = require('./routes/Auth');
const contactRoutes = require('./routes/contact');
const tileRoutes = require('./routes/tileRoutes'); 
const cartRoutes = require('./routes/cartroutes');
const requestRoutes = require('./routes/requestroutes'); // Add request routes
app.use('/api/auth', authRoutes);       // signup/login/reset-password
app.use('/api/contact', contactRoutes); // send-email
app.use('/api/tiles', tileRoutes); 
app.use('/api/cart', cartRoutes);  
app.use('/api/request', requestRoutes);  // Add request route

const Admin = require('./models/Admin');

// 🔁 Define this BEFORE calling it
const seedDefaultAdmin = async () => {
  const exists = await Admin.findOne({ email: 'admin@bogantiles.com' });
  if (!exists) {
    const admin = new Admin({
      email: 'admin@bogantiles.com',
      password: 'aDmIn@729', // You can hash this later
    });
    await admin.save();
    console.log('✅ Default admin created');
  } else {
    console.log('⚠️ Admin already exists');
  }
};

app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => { // Destroy the session
    if (err) {
      return res.status(500).send('Failed to log out');
    }
    res.status(200).send('Logged out successfully');
  });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    seedDefaultAdmin(); // Call it after DB connects
    app.listen(process.env.PORT || 5000, '0.0.0.0', () => {
      console.log(`🚀 Server running at http://0.0.0.0:${process.env.PORT || 5000}`);
    });
    
  })
  .catch(err => console.error("❌ DB Connection Error:", err));
