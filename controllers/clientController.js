const subscriberService = require("../services/subscriberService");
const ResponseBody = require("../models/ResponseBody");
const maxmind = require("maxmind");

const {
	validateInputEmail,
	validateInputPassword,
	generateRandomPassword,
} = require("../utils/commonUtils");

const addSubscriber = async (req, res) => {
	const responseBody = new ResponseBody();
	try {
		const { emailAddress, ipAddress } = req.body;

		responseBody.statusCode = 400;

		if (!emailAddress) {
			responseBody.message = "emailAddress is Required";
			return res.status(400).json(responseBody);
		}

		if (emailAddress.length > 128) {
			responseBody.message = "Max emailAddress length is 128";
			return res.status(400).json(responseBody);
		}

		const isValidEmailFormat = validateInputEmail(emailAddress);

		if (!isValidEmailFormat) {
			responseBody.message = "Invalid Email Format";
			return res.status(400).json(responseBody);
		}

		let source = "N/A";
		if (ipAddress) {
			const location = await getLocation(ipAddress);
			if (location) {
				source = `${location.country}/${location.city}`;
			} else {
				console.log("Unknown Client's Location");
			}
		}

		const existingEmail = await subscriberService.findByEmailAddress(emailAddress);
		if (existingEmail) {
			responseBody.message = "Your email is already registered";
			return res.status(400).json(responseBody);
		}

		const result = await subscriberService.subscribe(emailAddress, source);
		if (result) {
			responseBody.statusCode = 200;
			responseBody.message = "Success";
			responseBody.isSuccess = true;
			responseBody.objectData = {
				result: emailAddress,
			};
			return res.status(200).json(responseBody);
		}
		throw new Error("Failed to add new Subsciption");
	} catch (error) {
		console.log(error);
		responseBody.responseMessage = "Something went wrong";
		responseBody.statusCode = 500;
		res.status(500).json(responseBody);
	}
};

const getSubscriber = async (req, res) => {
	const responseBody = new ResponseBody();
	try {
		const startIndex = req.params.startIndex || 0;

		const result = await subscriberService.findAll(parseInt(startIndex));

		responseBody.statusCode = 200;
		responseBody.message = "Success";
		responseBody.isSuccess = true;
		responseBody.objectData = result;
		res.status(200).json(responseBody);
	} catch (error) {
		console.log(error);
	}
};

const getLocation = async (ipAddress) => {
	try {
		const cityLookup = await maxmind.open("GeoLite2-City_20240116/GeoLite2-City.mmdb");
		const location = cityLookup.get(ipAddress);
		return {
			city: location.city.names.en,
			country: location.country.names.en,
		};
	} catch (error) {
		console.log(error);
	}
	return null;
};

module.exports = { addSubscriber, getSubscriber };
