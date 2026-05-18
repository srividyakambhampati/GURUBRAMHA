const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL // Will be added in Azure App Service Configuration
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
    res.send('GuruBramha API is running...');
});

// Import routes (to be created)
// const authRoutes = require('./routes/auth');
// const courseRoutes = require('./routes/courses');
// const practiceRoutes = require('./routes/practice');
// const interviewRoutes = require('./routes/interview');

const paymentRoutes = require('./routes/payment');
const digilockerRoutes = require('./routes/digilocker');

// Use routes
// app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/digilocker', digilockerRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
