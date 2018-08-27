'use strict';
const nodemailer = require('nodemailer');
const config = require('../config');

class Mail
{

	constructor(transportOptions) {
		this.transporter = nodemailer.createTransport(transportOptions);
	}
	sendMail(mailOptions, callback){
		// send mail with defined transport object
		this.transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return console.log(error);
			}
			console.log('Message sent: %s', info.messageId);
			callback(error, info);
		});
	}
}

module.exports = Mail;