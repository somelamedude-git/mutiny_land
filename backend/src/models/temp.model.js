const mongoose = require('mongoose');
const crypto = require('crypto');

const tempSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		lowercase: true
	},

	mailToken: {
		type: String
	},

	mailTokenExp: {
		type: Date
	}
}, {timestamps: true});

tempSchema.methods.getVerificationToken = function(){
	const token = crypto.randomBytes(29).toString('hex');
	this.mailToken = crypto
	.createHash('sha256')
	.update(token)
	.digest('hex');

	this.mailTokenExp = Date.now() + 30*60*1000;
	return token;
}

const TempUser = mongoose.model('TempUser', tempSchema);

module.exports = {
	TempUser
}



