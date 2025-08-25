const nodemailer = require('nodemailer');
require('dotenv').config({path: '../.env'});
const crypto = require('crypto');
const { TempUser } = require('../models/temp.model.js');
const { Email } = require('../models/email_col.model.js');
const sendEmail = async(options)=>{
	console.log('I am inside send email');
	const transporter = nodemailer.createTransport({
		service: process.env.EMAIL_SERVICE,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS
		}
	});

	const mailOptions = {
		from: `${process.env.FROM_NAME}<${process.env.EMAIL_USER}>`,
		to: options.email,
		subject: options.subject,
		text: options.message
	};

	await transporter.sendMail(mailOptions);
}

const verifyMail = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const tempuser = await TempUser.findOne({
      mailToken: hashedToken,
      mailTokenExp: { $gt: Date.now() },
    });

    if (!tempuser) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    await Email.create({ email: tempuser.email });

    await TempUser.findByIdAndDelete(tempuser._id);

    res.status(200).json({
      success: true,
      message: "You are verified now",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = {
	sendEmail,
	verifyMail
}





