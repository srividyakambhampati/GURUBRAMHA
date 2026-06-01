const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

/* ======================================================
   LOAD ENV VARIABLES
====================================================== */

require('dotenv').config({
    path: path.join(__dirname, '.env')
});

console.log('✅ Environment Variables Loaded');

console.log(
    'MONGODB_URI:',
    process.env.MONGODB_URI ? 'FOUND' : 'MISSING'
);

console.log(
    'RAZORPAY_KEY_ID:',
    process.env.RAZORPAY_KEY_ID ? 'FOUND' : 'MISSING'
);

/* ======================================================
   EXPRESS APP
====================================================== */

const app = express();

const PORT = process.env.PORT || 5000;

/* ======================================================
   CORS CONFIGURATION
====================================================== */

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://gray-meadow-0f33d7a00.7.azurestaticapps.net'
];

if (process.env.FRONTEND_URL) {

    allowedOrigins.push(process.env.FRONTEND_URL);

    if (process.env.FRONTEND_URL.endsWith('/')) {

        allowedOrigins.push(
            process.env.FRONTEND_URL.slice(0, -1)
        );

    } else {

        allowedOrigins.push(
            process.env.FRONTEND_URL + '/'
        );
    }
}

app.use(cors({

    origin: function (origin, callback) {

        console.log('Incoming Origin:', origin);

        if (!origin) {
            return callback(null, true);
        }

        const cleanOrigin = origin.replace(/\/$/, '');

        if (cleanOrigin.includes('localhost')) {
            return callback(null, true);
        }

        if (cleanOrigin.includes('azurestaticapps.net')) {
            return callback(null, true);
        }

        if (cleanOrigin.includes('azurewebsites.net')) {
            return callback(null, true);
        }

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

    console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.url}`
    );

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

            console.error(
                '❌ MongoDB connection error:',
                err
            );
        });

} else {

    console.error(
        '❌ WARNING: MONGODB_URI is missing.'
    );
}

/* ======================================================
   ROUTES
====================================================== */

try {

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

    console.log('✅ Routes Loaded Successfully');

} catch (routeErr) {

    console.error(
        '❌ Route loading failed:',
        routeErr
    );
}

/* ======================================================
   STATIC FILES
====================================================== */

const clientDistPath =
    (
        process.env.NODE_ENV === 'production' ||
        !fs.existsSync(
            path.join(__dirname, '../client/dist')
        )
    )
        ? path.join(__dirname, 'public')
        : path.join(__dirname, '../client/dist');

console.log(
    '📁 Serving static files from:',
    clientDistPath
);

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
   UPLOADS STATIC
====================================================== */

app.use(
    '/uploads',
    express.static(
        path.join(__dirname, 'public/uploads')
    )
);

/* ======================================================
   DEBUG ENDPOINT
====================================================== */

let lastError = null;

app.get('/api/debug', (req, res) => {

    try {

        const pubPath = path.join(__dirname, 'public');

        const files = fs.existsSync(pubPath)
            ? fs.readdirSync(pubPath)
            : [];

        let assetsFiles = [];

        try {

            const assetsPath = path.join(pubPath, 'assets');

            if (fs.existsSync(assetsPath)) {

                assetsFiles = fs.readdirSync(assetsPath);
            }

        } catch (assetErr) {

            assetsFiles = [
                'Error listing assets: ' + assetErr.toString()
            ];
        }

        const indexHtml = path.join(pubPath, 'index.html');

        let stats = null;
        let content = '';

        if (fs.existsSync(indexHtml)) {

            stats = fs.statSync(indexHtml);

            content = fs.readFileSync(
                indexHtml,
                'utf8'
            );
        }

        res.json({
            status: 'ok',
            publicFiles: files,
            assetsFiles,
            indexSize: stats ? stats.size : 0,
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
   REACT CLIENT-SIDE ROUTING
====================================================== */

app.get(/.*/, (req, res) => {

    const indexPath = path.join(
        clientDistPath,
        'index.html'
    );

    if (!fs.existsSync(indexPath)) {

        return res.status(500).send(
            '❌ index.html not found.'
        );
    }

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
