const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS — allow localhost in dev; in production, same-domain requests have no Origin header so they pass automatically
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (same-domain, mobile apps, Postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
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
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('✅ Connected to MongoDB'))
        .catch((err) => console.error('❌ MongoDB connection error:', err));
} else {
    console.error('❌ WARNING: MONGODB_URI is not defined in the environment variables. Database features will fail.');
}

const paymentRoutes = require('./routes/payment');
const digilockerRoutes = require('./routes/digilocker');

// API routes
app.use('/api/payment', paymentRoutes);
app.use('/api/digilocker', digilockerRoutes);

// Debug endpoint to check files on Azure
let lastError = null;
app.get('/api/debug', (req, res) => {
    const fs = require('fs');
    try {
        const pubPath = path.join(__dirname, 'public');
        const files = fs.readdirSync(pubPath);
        const indexHtml = path.join(pubPath, 'index.html');
        const stats = fs.statSync(indexHtml);
        const content = fs.readFileSync(indexHtml, 'utf8');
        
        let assetsFiles = [];
        try {
            assetsFiles = fs.readdirSync(path.join(pubPath, 'assets'));
        } catch (assetErr) {
            assetsFiles = ['Error listing assets: ' + assetErr.toString()];
        }

        res.json({
            status: 'ok',
            publicFiles: files,
            assetsFiles: assetsFiles,
            indexSize: stats.size,
            indexPreview: content.substring(0, 200),
            lastError: lastError ? { message: lastError.message, stack: lastError.stack } : null
        });
    } catch (e) {
        res.status(500).json({ error: e.toString(), lastError: lastError ? { message: lastError.message, stack: lastError.stack } : null });
    }
});

// Request logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Serve React static files
// Locally, it uses ../client/dist. On Azure, the Github Action copies it to ./public
const fs = require('fs');
const clientDistPath = (process.env.NODE_ENV === 'production' || !fs.existsSync(path.join(__dirname, '../client/dist')))
    ? path.join(__dirname, 'public')
    : path.join(__dirname, '../client/dist');

app.use(express.static(clientDistPath, {
    setHeaders: (res, filePath) => {
        try {
            if (typeof filePath === 'string' && filePath.endsWith('index.html')) {
                res.setHeader('Cache-Control', 'no-cache');
            } else {
                res.setHeader('Cache-Control', 'public, max-age=31536000');
            }
        } catch (headerErr) {
            console.error('Error in setHeaders callback:', headerErr);
        }
    }
}));

// For any non-API route, serve the React app (client-side routing)
app.get(/.*/, (req, res) => {
    const indexPath = path.join(clientDistPath, 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('Error sending index.html:', err);
            lastError = err;
            res.status(500).send('Application error: could not load frontend.');
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('⚠️ Unhandled Express Error:', err);
    lastError = err;
    res.status(500).json({
        error: 'Express Unhandled Error',
        message: err.message,
        stack: err.stack
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📁 Serving static files from: ${clientDistPath}`);
});
