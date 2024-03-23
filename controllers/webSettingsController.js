const siteMenuService = require("../services/siteMenuService");
const sectionService = require("../services/sectionService");
const ResponseBody = require("../models/ResponseBody");

const fetchSiteMenu = async (req, res) => {
	const responseBody = new ResponseBody();
	try {
		const resultSet = await siteMenuService.findAll();

		responseBody.statusCode = 200;
		responseBody.message = "Success";
		responseBody.isSuccess = true;
		responseBody.objectData = resultSet;

		res.status(200).json(responseBody);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error" });
	}
};

const fetchSiteMenuMapping = async (req, res) => {
	const responseBody = new ResponseBody();
	try {
		const sectionId = req.params.sectionId;

		const resultSet = await siteMenuService.findMappedBySectionId(sectionId);

		responseBody.statusCode = 200;
		responseBody.message = "Success";
		responseBody.isSuccess = true;
		responseBody.objectData = resultSet;

		res.status(200).json(responseBody);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error" });
	}
};

const fetchSection = async (req, res) => {
	const responseBody = new ResponseBody();
	try {
		const resultSet = await sectionService.findAll();

		responseBody.statusCode = 200;
		responseBody.message = "Success";
		responseBody.isSuccess = true;
		responseBody.objectData = resultSet;

		res.status(200).json(responseBody);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error" });
	}
};

const fetchSectionById = async (req, res) => {
	const responseBody = new ResponseBody();
	try {
		const sectionId = req.params.sectionId;

		const resultSet = await sectionService.findSectionById(sectionId);

		responseBody.statusCode = 200;
		responseBody.message = "Success";
		responseBody.isSuccess = true;
		responseBody.objectData = resultSet;

		res.status(200).json(responseBody);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error" });
	}
};

module.exports = { fetchSiteMenu, fetchSiteMenuMapping, fetchSection, fetchSectionById };
