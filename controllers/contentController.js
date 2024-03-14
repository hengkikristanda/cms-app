const PublicDocs = require("../models/PublicDocs");
const ImagesModel = require("../models/ImagesModel");
const imageService = require("../services/imageService");
const ContentModel = require("../models/ContentModel");
const ResponseBody = require("../models/ResponseBody");
const axios = require("axios");
const contentService = require("../services/contentService");
const { generateTimestampBasedUUID, STATIC_FILE_BASEURL } = require("../utils/commonUtils");
const fs = require("fs").promises;
const fsWrite = require("fs");
const FormData = require("form-data");

const uploadFile = async (req, res) => {
	try {
		if (!req.files) {
			return res.status(400).json({ message: "No file uploaded" });
		}
		const pdfFiles = req.files.filter((file) => file.mimetype === "application/pdf");

		const formData = new FormData();

		for (const pdfFile of pdfFiles) {
			const fileData = await fs.readFile(pdfFile.path);

			await PublicDocs.create({
				id: generateTimestampBasedUUID(),
				originalFileName: pdfFile.originalname,
				mimeType: pdfFile.mimetype,
				fileName: pdfFile.filename,
				documentData: fileData,
			});

			formData.append("files", fsWrite.createReadStream(pdfFile.path));
			// await fs.unlink(pdfFile.path);
			// formData.append("files", fileData);
		}

		let webEndPoint = "http://localhost:3200/api/uploads/publicDocs";

		let config = {
			method: "post",
			maxBodyLength: Infinity,
			url: webEndPoint,
			headers: {
				...formData.getHeaders(),
			},
			data: formData,
		};

		axios
			.request(config)
			.then((response) => {
				console.log(JSON.stringify(response.data));
			})
			.catch((error) => {
				console.log(error);
			});

		res.status(200).json({ message: "File uploaded successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error" });
	}
};

const uploadImage = async (req, res) => {
	const uploadedImages = [];
	try {
		if (!req.files) {
			return res.status(400).json({ message: "No image uploaded" });
		}

		const imageFiles = req.files.filter((file) => file.mimetype.startsWith("image/"));

		const formData = new FormData();

		for (const imageFile of imageFiles) {
			const fileData = await fs.readFile(imageFile.path);

			const result = await ImagesModel.create({
				id: generateTimestampBasedUUID(),
				originalFileName: imageFile.originalname,
				mimeType: imageFile.mimetype,
				fileName: imageFile.filename,
				imageData: fileData,
			});

			if (result.id) {
				uploadedImages.push({
					id: result.id,
					originalFileName: result.originalFileName,
				});

				formData.append("files", fsWrite.createReadStream(imageFile.path));
			}
		}

		let webEndPoint = "http://localhost:3200/api/uploads/publicImages";

		let config = {
			method: "post",
			maxBodyLength: Infinity,
			url: webEndPoint,
			headers: {
				...formData.getHeaders(),
			},
			data: formData,
		};

		axios
			.request(config)
			.then((response) => {
				console.log(JSON.stringify(response.data));
			})
			.catch((error) => {
				console.log(error);
			});

		res.status(200).json({ message: "File uploaded successfully", data: uploadedImages });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error" });
	}
};

const createContent = async (req, res) => {
	const WEB_UPDATER_BASE_ENDPOINT = process.env.ILIMITS_WEB_V2_UPDATER_API;

	const responseBody = new ResponseBody();
	try {
		const {
			imageId,
			heading,
			subHeading,
			footNote,
			contentStatus,
			textContent,
			ctaButtonLabel,
			ctaButtonLink,
			userId = "N/A",
		} = req.body;

		console.log("Creating new Content...");
		const result = await contentService.createContent(
			imageId,
			heading,
			subHeading,
			footNote,
			contentStatus,
			textContent,
			ctaButtonLabel,
			ctaButtonLink,
			(createdBy = userId)
		);

		if (result instanceof ContentModel) {
			console.log("Composing Request Body...");

			let imageFileName;

			if (result.imageId) {
				const image = await imageService.findByPk(imageId);
				if (image) {
					imageFileName = image.originalFileName;
				}
			}

			const jsonRequestBody = {
				[result.id]: {
					imageId: result.imageId,
					imageFileName,
					heading: result.heading,
					subHeading: result.subHeading,
					footNote: result.footNote,
					contentStatus: result.contentStatus,
					textContent: result.textContent,
					ctaButtonLabel: result.ctaButtonLabel,
					ctaButtonLink: result.ctaButtonLink,
				},
			};

			console.log("Composed Request Body: ", jsonRequestBody);

			// send new created content to web ilimits endpoint
			let config = {
				method: "post",
				maxBodyLength: Infinity,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(jsonRequestBody),
			};

			const apiResponse = await fetch(`${WEB_UPDATER_BASE_ENDPOINT}/promotion`, config);
			if (!apiResponse.ok) {
				console.log("Failed to update data to web");
				const errorResponse = await apiResponse.json();
				console.log(errorResponse);
			} else {
				console.log("Successfully update data to web");
			}
		}

		responseBody.statusCode = 200;
		responseBody.message = "Success";
		responseBody.isSuccess = true;
		responseBody.objectData = {
			// result: emailAddress,
		};
		res.status(200).json(responseBody);
	} catch (error) {
		console.log(error);
		responseBody.responseMessage = "Something went wrong";
		responseBody.statusCode = 500;
		res.status(500).json(responseBody);
	}
};

const fetchAll = async (req, res) => {
	const responseBody = new ResponseBody();
	try {
		const startIndex = req.params.startIndex || 0;

		const result = await contentService.findAll(parseInt(startIndex));

		responseBody.statusCode = 200;
		responseBody.message = "Success";
		responseBody.isSuccess = true;
		responseBody.objectData = result;
		res.status(200).json(responseBody);
	} catch (error) {
		console.log(error);
	}
};

const fetchView = async (req, res) => {
	const responseBody = new ResponseBody();
	try {
		const contentId = req.params.contentId;

		const result = await contentService.findView(contentId);

		responseBody.statusCode = 200;
		responseBody.message = "Success";
		responseBody.isSuccess = true;
		responseBody.objectData = result;
		res.status(200).json(responseBody);
	} catch (error) {
		console.log(error);
	}
};

const deleteContent = async (req, res) => {
	const responseBody = new ResponseBody();
	try {
		const contentId = req.params.contentId;
		if (contentId) {
			const result = await contentService.deleteById(contentId);
			if (result) {
				let config = {
					method: "delete",
				};

				const apiResponse = await fetch(
					`http://localhost:3200/api/content/promotion/${contentId}`,
					config
				);

				if (!apiResponse.ok) {
					console.log("Failed to update data to web");
					const errorResponse = await apiResponse.json();
					console.log(errorResponse);
				} else {
					console.log("Successfully update data to web");
				}

				responseBody.responseMessage = "Content successfully deleted";
				responseBody.statusCode = 200;
				return res.status(200).json(responseBody);
			}
			throw new Error("No row affected");
		}
		throw new Error("Content id is required");
	} catch (error) {
		console.log(error);
		responseBody.responseMessage = "Failed to delete Content: " + error.message;
		responseBody.statusCode = 401;
		res.status(401).json(responseBody);
	}
};

module.exports = { uploadFile, uploadImage, createContent, fetchAll, fetchView, deleteContent };
