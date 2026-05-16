const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const CLIENT_ID = process.env.DIGILOCKER_CLIENT_ID;
const CLIENT_SECRET = process.env.DIGILOCKER_CLIENT_SECRET;
const REDIRECT_URI = process.env.DIGILOCKER_REDIRECT_URI;

// 1. Redirect to DigiLocker Authorization
router.get('/authorize', (req, res) => {
    const authUrl = `https://api.digitallocker.gov.in/public/oauth2/1/authorize?response_type=code&client_id=${CLIENT_ID}&state=gurubramha_state&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    res.redirect(authUrl);
});

// 2. Callback from DigiLocker
router.get('/callback', async (req, res) => {
    const { code, state } = req.query;

    if (!code) {
        return res.redirect('http://localhost:5173/documents?error=auth_cancelled');
    }

    try {
        // Exchange code for Access Token
        const tokenResponse = await axios.post('https://api.digitallocker.gov.in/public/oauth2/1/token', {
            code,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code'
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const { access_token } = tokenResponse.data;

        // In a real app, you would store this token securely (Session/DB)
        // For now, we'll redirect back with a success flag
        res.redirect(`http://localhost:5173/documents?status=linked&token=${access_token}`);
        
    } catch (error) {
        console.error('DigiLocker Auth Error:', error.response?.data || error.message);
        res.redirect('http://localhost:5173/documents?status=error');
    }
});

// 3. Fetch User Documents (Example)
router.get('/documents', async (req, res) => {
    const { token } = req.query;
    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
        const response = await axios.get('https://api.digitallocker.gov.in/public/oauth2/1/files/issued', {
            headers: { Authorization: `Bearer ${token}` }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Fetch Docs Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch documents' });
    }
});

module.exports = router;
