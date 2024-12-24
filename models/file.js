const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const fileSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true,
	},
	tag: {
		type: String,
	},
	email: {
		type: String,
		trim: true,
	},
	imageUrl: {
		type: String,
	},
});

async function main() {
	// send mail with defined transport object
	const info = await transporter.sendMail({
		from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
		to: 'bar@example.com, baz@example.com', // list of receivers
		subject: 'Hello ✔', // Subject line
		text: 'Hello world?', // plain text body
		html: '<b>Hello world?</b>', // html body
	});

	console.log('Message sent: %s', info.messageId);
	// Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

fileSchema.post('save', async function (doc) {
	console.log('DOC-> ', doc);
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASS,
			},
		});

		const info = transporter.sendMail({
			from: 'Kedi_Chiz ->  Vicky Don', // sender address
			to: doc.email, // list of receivers
			subject: 'Welcome To Cloud Images', // Subject line
			// text: 'Hello world?', // plain text body
			html: `<h2>Image</h2> <p>You can watch your Photo here ${doc.imageUrl}</p>`, // html body
		});
	} catch (err) {
		console.log(err);
	}
});

module.exports = mongoose.model('File', fileSchema);
