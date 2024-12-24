const express = require('express');
const server = express();

require('dotenv').config();

const PORT = process.env.PORT || 5000;
server.use(express.json());
const connectWithDb = require('./config/database');
connectWithDb();

server.listen(PORT, () => {
	console.log(`server is active at port ${PORT}`);
});

server.get('/', (req, res) => {
	res.send(`<div> Yo Bitch </div>`);
});

// for uploading file on server
const fileUpload = require('express-fileupload');
server.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: '/tmp/',
	})
);

//  Connect with cloudinary
const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();

// import Router For File Upload

const fileRouter = require('./routes/fileUpload');
server.use('/files', fileRouter);
