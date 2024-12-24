const File = require('../models/file');
const cloudinary = require('cloudinary').v2;

exports.localFileUpload = async (req, res) => {
	try {
		// fetch file
		const file = req.files.fileName;
		console.log('file -> ', file);

		// create path where file need to be uploaded on server
		let path =
			__dirname + '/files/' + Date.now() + `.${file.name.split('.')[1]}`;
		console.log('path-> ', path);

		// add path to the move function
		file.mv(path, (err) => {
			console.log('Error aa gya ji');
		});

		res.json({
			success: true,
			message: 'Upload Successfully',
		});
	} catch (err) {
		return res.status(400).json({
			success: false,
			message: 'Problem in Uploading File',
		});
	}
};

// Function to Check if file type is supported
function isSupportedType(type, supportedType) {
	return supportedType.includes(type);
}

// Function to Upload file on cloudinary
async function uploadFileToCloudinary(file, folder, quality) {
	const options = { folder };
	console.log('options->, ', options);
	if (quality) {
		options.quality = quality;
		console.log('quality-> ', quality);
	}
	options.resource_type = 'auto';
	console.log('file.tmp-> ', file.tempFilePath);
	return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// Single Image Upload Function

exports.imageUpload = async (req, res) => {
	try {
		const { name, tag, email } = req.body;
		console.log('info-> ', name, email, tag);
		const file = req.files.imageFile;
		console.log('file-> ', file);
		const supportedType = ['jpg', 'png', 'jpeg'];
		const fileType = file.name.split('.')[1].toLowerCase();
		console.log('type-> ', fileType);
		if (!isSupportedType(fileType, supportedType)) {
			return res.status(401).json({
				success: false,
				message: 'File type not supported',
			});
		} else {
			const response = await uploadFileToCloudinary(file, 'Vaibhav');
			console.log('response-> ', response);

			const savedImage = await File.create({
				name,
				email,
				tag,
				imageUrl: response.secure_url,
			});
			return res.status(201).json({
				success: true,
				message: 'uploaded Successfully',
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			success: false,
			message: 'Image not uploaded successfully',
		});
	}
};

// Video Upload Function

exports.videoUpload = async (req, res) => {
	try {
		const { name, tag, email } = req.body;
		console.log('tag-> ', name, tag, email);
		const file = req.files.videoFile;
		console.log('file-> ', file);

		const supportedType = ['mp4', 'mov'];
		const videotype = file.name.split('.')[1].toLowerCase();

		if (!isSupportedType(videotype, supportedType)) {
			return res.json({
				success: false,
				message: 'Video type not supported',
			});
		}

		const response = await uploadFileToCloudinary(file, 'Vaibhav');
		console.log('response-> ', response);

		const savedVideo = await File.create({
			name,
			tag,
			email,
			imageUrl: response.secure_url,
		});

		return res.status(200).json({
			success: true,
			message: 'Video Uploaded Succesfully',
		});
	} catch (error) {
		return res.statis(400).json({
			success: false,
			messaeg: 'Video not uploade successfully',
		});
	}
};

// Image size reducer
exports.imageSizeReducer = async (req, res) => {
	try {
		const { name, tag, email } = req.body;
		console.log('tags-> ', name, email, tag);
		const file = req.files.imageFile;
		console.log('file-> ', file);
		const supportedType = ['jpg', 'png', 'jpeg'];
		const imageType = file.name.split('.')[1].toLowerCase();
		if (!isSupportedType(imageType, supportedType)) {
			return res.status(401).json({
				success: false,
				messaeg: 'image type not supported',
			});
		} else {
			const response = await uploadFileToCloudinary(file, 'Vaibhav', 95);

			console.log('response-> ', response);
			return res.status(201).json({
				success: true,
				message: 'Image size reduced Successfully',
			});
		}
	} catch (error) {
		return res.status(400).json({
			success: false,
			message: 'Image size cannot sucessfully reduced.',
		});
	}
};
