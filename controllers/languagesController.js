const languagesService = require("../services/languagesService");
const ResponseBody = require("../models/ResponseBody");

const fetchAll = async (req, res) => {
	const responseBody = new ResponseBody();
	try {
		const resultSet = await languagesService.findAll();

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

module.exports = { fetchAll };
