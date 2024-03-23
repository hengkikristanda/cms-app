const SectionModel = require("../models/SectionModel");

const findAll = async () => {
	try {
		return SectionModel.findAll();
	} catch (error) {
		console.log(error);
		throw new Error("Error Find All Section");
	}
};

const findSectionById = async (sectionId) => {
	try {
		return await SectionModel.findAll({
			where: {
				id: sectionId,
			},
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Section by id: ", sectionId);
	}
};

module.exports = { findAll, findSectionById };
