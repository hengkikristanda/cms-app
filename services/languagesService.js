const LanguagesModel = require("../models/LanguagesModel");

const findAll = async () => {
	try {
		return LanguagesModel.findAll();
	} catch (error) {
		console.log(error);
		throw new Error("Error Find All Languages");
	}
};

module.exports = { findAll };
