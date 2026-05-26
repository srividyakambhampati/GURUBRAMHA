const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Configure NodeMailer
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// @route   POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        let user = await User.findOne({ email });
        
        if (!user) {
            // For testing purposes: create a dummy user so the reset flow works
            user = new User({
                email,
                displayName: 'Test Scholar',
                firebaseUid: 'test-' + Date.now()
            });
            await user.save();
        }

        // Generate token
        const token = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${token}`;

        // Attempt to send real email
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            const mailOptions = {
                to: user.email,
                from: process.env.SMTP_USER,
                subject: 'GuruBramha Academy - Password Reset',
                html: `
                    <h2>Password Reset Request</h2>
                    <p>You requested a password reset for your GuruBramha Vault.</p>
                    <p>Click the link below to securely reset your credentials:</p>
                    <a href="${resetUrl}" style="padding: 10px 20px; background-color: #3B82F6; color: white; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">Initialize Reset</a>
                    <p>This link will expire in 1 hour.</p>
                `
            };
            await transporter.sendMail(mailOptions);
            console.log(`✅ Real Email sent successfully to ${user.email}`);
        } else {
            console.log('⚠️ Warning: SMTP_USER and SMTP_PASS are missing from .env! Email not sent.');
        }

        // Also log to terminal as backup
        console.log('\n======================================================');
        console.log('🔒 PASSWORD RESET LINK');
        console.log(`Email: ${email}`);
        console.log(`Click here to reset: ${resetUrl}`);
        console.log('======================================================\n');

        res.status(200).json({ message: 'Reset link generated successfully!' });
    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).json({ error: 'Server error during password reset request.' });
    }
});

// @route   POST /api/auth/reset-password/:token
router.post('/reset-password/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ error: 'Password reset token is invalid or has expired.' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        
        // Clear reset fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password has been successfully reset.' });
    } catch (err) {
        console.error('Reset password error:', err);
        res.status(500).json({ error: 'Server error during password reset.' });
    }
});

// Helper for basic XSS sanitization
const sanitizeInput = (str) => {
    if (typeof str !== 'string') return str;
    return str.replace(/<[^>]*>/g, '').trim();
};

// @route   POST /api/auth/check-phone
router.post('/check-phone', async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) {
            return res.status(450).json({ error: 'Phone number is required.' });
        }
        const cleanPhone = sanitizeInput(phone);
        const userExists = await User.findOne({ phone: cleanPhone });
        if (userExists) {
            return res.json({ exists: true });
        }
        return res.json({ exists: false });
    } catch (err) {
        console.error('Check phone error:', err);
        res.status(500).json({ error: 'Server error during phone validation.' });
    }
});

// @route   POST /api/auth/signup
router.post('/signup', async (req, res) => {
    try {
        const { displayName, email, phone, address, password } = req.body;

        // Backend Validations
        const cleanName = sanitizeInput(displayName);
        const cleanEmail = sanitizeInput(email).toLowerCase();
        const cleanPhone = sanitizeInput(phone);
        const cleanAddress = sanitizeInput(address);

        if (!cleanName || !cleanEmail || !cleanPhone || !cleanAddress || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Name Validation
        if (/[0-9]/.test(cleanName)) {
            return res.status(400).json({ error: 'Numerical values are not allowed in name field.' });
        }
        if (/[^a-zA-Z\s]/.test(cleanName)) {
            return res.status(400).json({ error: 'Special characters are not allowed.' });
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cleanEmail)) {
            return res.status(400).json({ error: 'Please enter a valid email address.' });
        }

        // Phone Validation
        if (cleanPhone.length !== 10 || !/^\d+$/.test(cleanPhone)) {
            return res.status(400).json({ error: 'Phone number must contain exactly 10 digits.' });
        }

        const phoneExists = await User.findOne({ phone: cleanPhone });
        if (phoneExists) {
            return res.status(400).json({ error: 'This phone number is already registered.' });
        }

        const emailExists = await User.findOne({ email: cleanEmail });
        if (emailExists) {
            return res.status(400).json({ error: 'This email is already registered.' });
        }

        // Address Validation
        if (cleanAddress.length < 5) {
            return res.status(400).json({ error: 'Please enter a valid address.' });
        }

        // Password Validation
        const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        if (!pwRegex.test(password)) {
            return res.status(400).json({ error: 'Password must contain uppercase, lowercase, number, and special character.' });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            displayName: cleanName,
            email: cleanEmail,
            phone: cleanPhone,
            address: cleanAddress,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'Account created successfully.', user: { displayName: cleanName, email: cleanEmail } });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(550).json({ error: 'Server error during registration.' });
    }
});

// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const cleanEmail = sanitizeInput(email).toLowerCase();

        if (!cleanEmail || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        // Auto-seed requested admin credentials on login attempt if not present
        if (cleanEmail === 'adminguru@gmail.com') {
            let adminUser = await User.findOne({ email: 'adminguru@gmail.com' });
            if (!adminUser) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash('admin@1234', salt);
                adminUser = new User({
                    displayName: 'GuruBramha Admin',
                    email: 'adminguru@gmail.com',
                    password: hashedPassword,
                    phone: '0000000000',
                    address: 'GuruBramha Headquarters',
                    isSubscribed: true
                });
                await adminUser.save();
                console.log('👑 Admin account auto-seeded successfully!');
            }
        }

        const user = await User.findOne({ email: cleanEmail });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }

        res.json({
            message: 'Logged in successfully.',
            user: {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL || null
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error during authentication.' });
    }
});

module.exports = router;

