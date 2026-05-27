const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

require('dotenv').config();

const app = express();

// Azure prefers PORT from environment
const PORT = process.env.PORT || 8080;

/* ======================================================
   CORS CONFIGURATION
====================================================== */

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://gray-meadow-0f33d7a00.7.azurestaticapps.net'
];

if (process.env.FRONTEND_URL) {
    // Add the URL as provided
    allowedOrigins.push(process.env.FRONTEND_URL);

    // Also add it without a trailing slash (if it has one) or with a trailing slash (if it doesn't)
    if (process.env.FRONTEND_URL.endsWith('/')) {
        allowedOrigins.push(process.env.FRONTEND_URL.slice(0, -1));
    } else {
        allowedOrigins.push(process.env.FRONTEND_URL + '/');
    }
}

app.use(cors({
    origin: function (origin, callback) {

        console.log('Incoming Origin:', origin);

        // Allow requests without origin
        // (Postman, mobile apps, same-origin requests)
        if (!origin) {
            return callback(null, true);
        }

        // Remove trailing slash
        const cleanOrigin = origin.replace(/\/$/, '');

        // Allow localhost
        if (cleanOrigin.includes('localhost')) {
            return callback(null, true);
        }

        // Allow Azure Static Web Apps
        if (cleanOrigin.includes('azurestaticapps.net')) {
            return callback(null, true);
        }

        // Allow Azure App Service / SCM / Kudu
        if (cleanOrigin.includes('azurewebsites.net')) {
            return callback(null, true);
        }

        // Allow manually added origins
        if (allowedOrigins.includes(cleanOrigin)) {
            return callback(null, true);
        }

        console.log('Blocked by CORS:', cleanOrigin);

        callback(new Error('Not allowed by CORS'));
    },

    credentials: true
}));

/* ======================================================
   MIDDLEWARE
====================================================== */

app.use(express.json());
app.use(cookieParser());

/* ======================================================
   REQUEST LOGGER
====================================================== */


app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

/* ======================================================
   DATABASE CONNECTION
====================================================== */

if (process.env.MONGODB_URI) {

    mongoose.connect(process.env.MONGODB_URI)

        .then(() => {
            console.log('✅ Connected to MongoDB');
        })

        .catch((err) => {
            console.error('❌ MongoDB connection error:', err);
        });

} else {

    console.error(
        '❌ WARNING: MONGODB_URI is not defined in environment variables.'
    );
}

/* ======================================================
   ROUTES
====================================================== */

const paymentRoutes = require('./routes/payment');
const digilockerRoutes = require('./routes/digilocker');
const documentRoutes = require('./routes/documents');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const problemRoutes = require('./routes/problems');
const contestRoutes = require('./routes/contests');
const submissionRoutes = require('./routes/submissions');

app.use('/api/payment', paymentRoutes);
app.use('/api/digilocker', digilockerRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/contests', contestRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

/* ======================================================
   DEBUG ENDPOINT
====================================================== */

let lastError = null;

app.get('/api/debug', (req, res) => {

    try {

        const pubPath = path.join(__dirname, 'public');

        const files = fs.readdirSync(pubPath);

        let assetsFiles = [];

        try {

            assetsFiles = fs.readdirSync(
                path.join(pubPath, 'assets')
            );

        } catch (assetErr) {

            assetsFiles = [
                'Error listing assets: ' + assetErr.toString()
            ];
        }

        const indexHtml = path.join(pubPath, 'index.html');

        const stats = fs.statSync(indexHtml);

        const content = fs.readFileSync(indexHtml, 'utf8');

        res.json({
            status: 'ok',
            publicFiles: files,
            assetsFiles,
            indexSize: stats.size,
            indexPreview: content.substring(0, 200),

            lastError: lastError
                ? {
                    message: lastError.message,
                    stack: lastError.stack
                }
                : null
        });

    } catch (e) {

        res.status(500).json({
            error: e.toString(),

            lastError: lastError
                ? {
                    message: lastError.message,
                    stack: lastError.stack
                }
                : null
        });
    }
});

/* ======================================================
   STATIC FILES
====================================================== */

const clientDistPath =
    (
        process.env.NODE_ENV === 'production' ||
        !fs.existsSync(path.join(__dirname, '../client/dist'))
    )
        ? path.join(__dirname, 'public')
        : path.join(__dirname, '../client/dist');

console.log('📁 Serving static files from:', clientDistPath);

app.use(express.static(clientDistPath, {

    setHeaders: (res, filePath) => {

        try {

            if (
                typeof filePath === 'string' &&
                filePath.endsWith('index.html')
            ) {

                res.setHeader(
                    'Cache-Control',
                    'no-cache'
                );

            } else {

                res.setHeader(
                    'Cache-Control',
                    'public, max-age=31536000'
                );
            }

        } catch (headerErr) {

            console.error(
                'Error in setHeaders callback:',
                headerErr
            );
        }
    }
}));

/* ======================================================
   REACT CLIENT-SIDE ROUTING
====================================================== */

app.get(/.*/, (req, res) => {

    const indexPath = path.join(
        clientDistPath,
        'index.html'
    );

    res.sendFile(indexPath, (err) => {

        if (err) {

            console.error(
                'Error sending index.html:',
                err
            );

            lastError = err;

            res.status(500).send(
                'Application error: could not load frontend.'
            );
        }
    });
});

/* ======================================================
   ERROR HANDLER
====================================================== */

app.use((err, req, res, next) => {

    console.error(
        '⚠️ Unhandled Express Error:',
        err
    );

    lastError = err;

    res.status(500).json({
        error: 'Express Unhandled Error',
        message: err.message,
        stack: err.stack
    });
});

/* ======================================================
   START SERVER
====================================================== */

app.listen(PORT, () => {

    console.log(`🚀 Server running on port ${PORT}`);

    console.log(
        `📁 Serving static files from: ${clientDistPath}`
    );
});
