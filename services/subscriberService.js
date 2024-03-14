const Subscriber = require("../models/Subscriber");
const { generateTimestampBasedUUID } = require("../utils/commonUtils");

const subscribe = async (emailAddress, source) => {
	try {
		const id = generateTimestampBasedUUID();
		return Subscriber.create({ id, emailAddress, source });
	} catch (error) {
		console.log(error);
		throw new Error("Error Inserting New Subscriber");
	}
};

const findAll = async (startIndex) => {
	try {
		return Subscriber.findAll({
			offset: startIndex,
			limit: 30,
			order: ["createdAt"],
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Find All Subscriber");
	}
};

const findByEmailAddress = async (emailAddress) => {
	try {
		return Subscriber.findOne({
			where: {
				emailAddress: emailAddress,
			},
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Subscriber");
	}
};

module.exports = { subscribe, findAll, findByEmailAddress };
