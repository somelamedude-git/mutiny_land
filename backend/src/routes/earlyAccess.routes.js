const express = require('express');
const { verifyMail } = require('../utils/mail.util.js');
const { handleEarlySignUp } = require('../APIs/email.api.js');

const router = express.Router();

router.get('/auth/verifyEmail/:token', verifyMail);
router.post('/sendMail', handleEarlySignUp);

module.exports = router;

