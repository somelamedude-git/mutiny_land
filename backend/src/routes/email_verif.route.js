const express = require('express');
const { verifyMail } = require('../utils/mail.util.js');

const router = express.Router();
router.get('/auth/verifyEmail/:token', verifyMail);

module.exports=router;
