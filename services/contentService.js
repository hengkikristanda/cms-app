const ContentModel = require("../models/ContentModel");
const ContentView = require("../models/modelView/ContentView");
const PromotionOverview = require("../models/modelView/PromotionOverview");
const PromotionOverviewCms = require("../models/modelView/PromotionOverviewCms");
const { generateTimestampBasedUUID } = require("../utils/commonUtils");
const { v4: uuidv4 } = require("uuid");
// const { Translate } = require("@google-cloud/translate").v2;
const languagesService = require("./languagesService");
// const translate = require("google-translate-api");
const { translate } = require("free-translate");

/* const translator = new Translate({
	// Optional: Specify your project ID if not using environment variables
	projectId: "YOUR_PROJECT_ID",
	// Note: The credentials can also be set up through environment variables
}); */

const createContent = async (
	heroImage,
	heading,
	subHeading,
	footNote,
	contentStatus,
	contentType,
	textContent,
	ctaButtonLabel,
	ctaButtonLink,
	createdBy
) => {
	try {
		/* const contents = [
			{
				id: uuidv4(),
				imageId,
				heading,
				subHeading,
				footNote,
				contentStatus,
				textContent,
				ctaButtonLabel,
				ctaButtonLink,
				createdBy,
				modifiedBy: createdBy,
			},
		]; */

		const defaultContent = {
			id: uuidv4(),
			heroImage,
			heading,
			subHeading,
			footNote,
			contentStatus,
			contentType,
			textContent,
			ctaButtonLabel,
			ctaButtonLink,
			createdBy,
			modifiedBy: createdBy,
		};

		// const contents = await translateContent(defaultContent);

		// console.log(contents);

		// return await ContentModel.bulkCreate(contents);

		// const translation = translateContent(heading);
		// console.log(translation);

		return ContentModel.create(defaultContent);

		// const results = await ContentModel
	} catch (error) {
		console.log(error);
		throw new Error("Error Creating New Content");
	}
};

const findAll = async (startIndex) => {
	try {
		return ContentModel.findAll({
			offset: startIndex,
			limit: 30,
			order: ["createdAt"],
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Find All Content");
	}
};

const fetchPromotionOverview = async (startIndex) => {
	try {
		return PromotionOverview.findAll({
			offset: parseInt(startIndex) * 20,
			limit: 20,
			order: [["modifiedAt", "DESC"]],
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Fetch Promotion Overview");
	}
};

const fetchPromotionOverviewCms = async (startIndex) => {
	try {
		return PromotionOverviewCms.findAll({
			offset: parseInt(startIndex) * 20,
			limit: 20,
			order: [["modifiedAt", "DESC"]],
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Fetch Promotion Overview");
	}
};

const findView = async (contentId) => {
	try {
		const clause = {
			order: [["lastModifiedDate", "DESC"]],
		};

		if (contentId) {
			clause.where = { id: contentId };
		}

		return ContentView.findAll(clause);
	} catch (error) {
		console.log(error);
		throw new Error("Error Find All Content");
	}
};

const deleteById = async (contentId) => {
	try {
		const contentToDelete = await ContentModel.findByPk(contentId);
		if (contentToDelete) {
			return await contentToDelete.destroy();
		}
		throw new Error("Content not Found");
	} catch (error) {
		console.log("Failed to delete content:", error.message);
		throw error;
	}
};

const fetchPromotionById = async (id) => {
	try {
		return ContentModel.findAll({
			where: {
				id,
			},
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Fetch Promotion Overview");
	}
};

const translateContent = async (defaultContent) => {
	const availableLanguage = await languagesService.findAll();

	const translation = [];

	availableLanguage.map(async (language) => {
		const languageCode = language.dataValues.code;

		const heading = await translateText(defaultContent.heading, languageCode);
		const subHeading = await translateText(defaultContent.subHeading, languageCode);
		const footNote = await translateText(defaultContent.footNote, languageCode);
		const ctaButtonLabel = await translateText(defaultContent.ctaButtonLabel, languageCode);

		translation.push({
			id: uuidv4(),
			// imageId,
			heading,
			subHeading,
			footNote,
			// contentStatus,
			// textContent,
			ctaButtonLabel,
			// ctaButtonLink,
			// createdBy,
			// modifiedBy: createdBy,
		});
	});

	// let result = await translator.translate(content, languageCode);
	// console.log(result);

	// availableLanguage.map((item) => {
	// 	const languageCode = item.dataValues.code;
	// 	let result = translator.translate(content, languageCode);
	// 	translation.push({
	// 		result,
	// 	});
	// });
	return translation;
};

async function translateText(targetContent, languageCode) {
	return await translate(targetContent, {
		from: "en",
		to: languageCode.toLowerCase(),
	});
}

const updateContent = async (updatedContent, contentId) => {
	try {
		const result = await ContentModel.update(updatedContent, {
			where: {
				id: contentId,
			},
		});

		return result;
	} catch (error) {
		console.error("Error updating content: ", error);
	}
};

module.exports = {
	fetchPromotionOverview,
	fetchPromotionById,
	createContent,
	findAll,
	findView,
	deleteById,
	fetchPromotionOverviewCms,
	updateContent,
};
