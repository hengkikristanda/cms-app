const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const contentController = require("../controllers/contentController");
const publicDocumentController = require("../controllers/publicDocumentController");
const languagesController = require("../controllers/languagesController");
const { getFileExtensionFromMime } = require("../utils/commonUtils");

const documentStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./static/assets/docs/");
	},
	filename: function (req, file, cb) {
		const fileName = Date.now() + "-" + file.originalname.replace(/ /g, "_");
		cb(null, fileName);
	},
});

const imageStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./static/assets/images/");
	},
	filename: function (req, file, cb) {
		// const fileName = Date.now() + "-" + file.originalname.replace(/ /g, "_");
		const fileName = file.originalname;
		cb(null, fileName);
	},
});

const documentUploader = multer({
	storage: documentStorage,
	limits: {
		fileSize: 1024 * 1024 * 5, // 5 MB limit
	},
});

const imageUploader = multer({
	storage: imageStorage,
	limits: {
		fileSize: 1024 * 1024 * 5, // 5 MB limit
	},
});

router.post("/docs/uploads", documentUploader.array("files"), contentController.uploadFile);
router.delete("/docs/:id", publicDocumentController.deleteDocument);
router.get("/docs", publicDocumentController.getDocument);

router.post("/image/uploads", imageUploader.array("files"), contentController.uploadImage);

router.post("/promotion", contentController.createContent);
// router.get("/promotion", contentController.fetchAll);
router.get("/promotions", contentController.fetchPromotions);
router.get("/promotion/:contentId?", contentController.fetchView);
router.delete("/promotion/:contentId", contentController.deleteContent);

//Languages
router.get("/languages", languagesController.fetchAll);

module.exports = router;
