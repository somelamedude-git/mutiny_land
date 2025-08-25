const { sendEmail } = require('../utils/mail.util.js');
const { TempUser } = require('../models/temp.model.js');

const handleEarlySignUp = async(req, res) =>{
	const { email } = req.body;
	console.log(email);

	const user =await  TempUser.create({
		email
	});

	console.log(user);

	const token = user.getVerificationToken();

	console.log(token);

	await user.save();
const verificationURL = `${req.protocol}://${req.get('host')}/api/auth/verifyEmail/${token}`;
	console.log(verificationURL);

	const message = `Welcome to Mutiny! Follow this link to make you are verified: ${verificationURL}`;

	await sendEmail({
		email: email,
		subject: 'Email Verification',
		message: message
	});

	res.status(200).json({
		success: true,
		message: 'Email sent successfully'
	});

}

module.exports = {
	handleEarlySignUp
}

	
