const SiteMenuModel = require("../models/SiteMenuModel");
const SiteMenuMappingView = require("../models/modelView/SiteMenuMappingView");

const findAll = async () => {
	try {
		return SiteMenuModel.findAll();
	} catch (error) {
		console.log(error);
		throw new Error("Error Find All Site Menu");
	}
};

const findMappedBySectionId = async (sectionId) => {
	try {
		return await SiteMenuMappingView.findAll({
			where: {
				sectionId: sectionId,
			},
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Footer Site Menu");
	}
};

module.exports = { findAll, findMappedBySectionId };
