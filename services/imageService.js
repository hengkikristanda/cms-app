const ImagesModel = require("../models/ImagesModel");

const findByPk = async (imageId) => {
	try {
		return ImagesModel.findByPk(imageId);
	} catch (error) {
		console.log(error);
		throw new Error("Error Findind Image by Id");
	}
};

module.exports = { findByPk };
