const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

// STEP 1: Create transporter with TLS (port 587)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,  // Use 587 for TLS
  secure: false,  // True for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false // Disable TLS certificate validation (for testing)
  }
});

// STEP 2: Verify transporter
transporter.verify((error, success) => {
  if (error) {
    console.error('Transporter error:', error);
  } else {
    console.log('Server is ready to send emails');
  }
});

// STEP 3: Setup POST route to send email
router.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Contact Us Message from ${name}`,
    text: `You have a new message:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    replyTo: email
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Error sending email' });
    }
    res.status(200).json({ message: 'Email sent successfully' });
  });
});

module.exports = router;

